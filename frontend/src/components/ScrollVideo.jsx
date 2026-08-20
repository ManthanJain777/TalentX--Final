import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

/**
 * ScrollVideo: Fixed full-bleed scroll-scrubbed background video
 * Layers:
 * 1. Poster img (fades out when video/canvas ready)
 * 2. Visible <video> (fallback scrub / initial decoded frame)
 * 3. <canvas> (draws cached scrubbed ImageBitmaps with object-cover math)
 */
const ScrollVideo = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const framesRef = useRef([]);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    const visibleVideo = videoRef.current;
    if (!canvas || !visibleVideo) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Resize canvas with devicePixelRatio
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // 2. Track scroll progress
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 3. Object-cover draw helper
    const drawCover = (imageSource) => {
      if (!ctx || !canvas || !imageSource) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const sw = imageSource.videoWidth || imageSource.width;
      const sh = imageSource.videoHeight || imageSource.height;

      if (!sw || !sh) return;

      const scale = Math.max(cw / sw, ch / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(imageSource, 0, 0, sw, sh, dx, dy, dw, dh);
    };

    // 4. Smooth Render Loop (Lerp 0.12)
    let lastRenderedFrameIndex = -1;
    const renderLoop = () => {
      if (prefersReducedMotion) {
        smoothedProgressRef.current = targetProgressRef.current;
      } else {
        smoothedProgressRef.current += (targetProgressRef.current - smoothedProgressRef.current) * 0.12;
      }

      const progress = smoothedProgressRef.current;
      const frames = framesRef.current;

      if (frames.length > 0) {
        const frameIndex = Math.min(Math.floor(progress * frames.length), frames.length - 1);
        if (frameIndex !== lastRenderedFrameIndex && frames[frameIndex]) {
          drawCover(frames[frameIndex]);
          lastRenderedFrameIndex = frameIndex;
        }
      } else if (visibleVideo && visibleVideo.duration) {
        // Fallback: Seek visible video if delta > 0.04s
        const targetTime = progress * Math.max(visibleVideo.duration - 0.05, 0.1);
        if (Math.abs(visibleVideo.currentTime - targetTime) > 0.04 && !visibleVideo.seeking) {
          visibleVideo.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);

    // 5. Offscreen Frame Extraction Pipeline
    let isCancelled = false;
    const extractFrames = async () => {
      try {
        const offscreenVideo = document.createElement('video');
        offscreenVideo.src = VIDEO_URL;
        offscreenVideo.muted = true;
        offscreenVideo.playsInline = true;
        offscreenVideo.crossOrigin = 'anonymous';
        offscreenVideo.preload = 'auto';

        await new Promise((resolve, reject) => {
          offscreenVideo.onloadeddata = resolve;
          offscreenVideo.onerror = reject;
        });

        if (isCancelled) return;

        const duration = offscreenVideo.duration || 5;
        const totalFrames = Math.min(Math.max(Math.floor(duration * 12), 24), 90);
        const extracted = [];

        // Max width 960px
        const maxWidth = 960;
        const scale = maxWidth / (offscreenVideo.videoWidth || 1920);
        const extractWidth = Math.round(offscreenVideo.videoWidth * scale);
        const extractHeight = Math.round(offscreenVideo.videoHeight * scale);

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = extractWidth;
        offscreenCanvas.height = extractHeight;
        const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: false });

        for (let i = 0; i < totalFrames; i++) {
          if (isCancelled) return;
          const seekTime = (i / (totalFrames - 1)) * (duration - 0.05);

          offscreenVideo.currentTime = seekTime;
          await new Promise((resolve) => {
            offscreenVideo.onseeked = resolve;
          });

          offscreenCtx.drawImage(offscreenVideo, 0, 0, extractWidth, extractHeight);
          
          if (window.createImageBitmap) {
            const bitmap = await createImageBitmap(offscreenCanvas);
            extracted.push(bitmap);
          } else {
            extracted.push(offscreenCanvas);
          }
        }

        if (!isCancelled && extracted.length > 0) {
          framesRef.current = extracted;
          setCanvasReady(true);
        }
      } catch (err) {
        console.warn('Frame cache extraction yielded to video fallback:', err);
      }
    };

    // Yield 300ms after visible video loadeddata before extraction starts
    const timer = setTimeout(() => {
      extractFrames();
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Clean up extracted bitmaps
      framesRef.current.forEach((frame) => {
        if (frame && typeof frame.close === 'function') {
          frame.close();
        }
      });
      framesRef.current = [];
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]" aria-hidden="true">
      {/* 1. Poster Image */}
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded || canvasReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. Visible Scrubbed Video Fallback */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          canvasReady ? 'opacity-0' : videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. Smooth Scrubbed Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          canvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ScrollVideo;
