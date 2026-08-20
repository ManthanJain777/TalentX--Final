import React, { useEffect, useRef, useState } from 'react';

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const smoothProgressRef = useRef(0);
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const totalFrames = 90;
    const objectUrls = [];

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.8;
      const target = Math.min(scrollY / maxScroll, 1);
      smoothProgressRef.current += (target - smoothProgressRef.current) * 0.12;
    };

    const drawFrame = () => {
      if (frames.length > 0 && isVideoReady) {
        const index = Math.floor(smoothProgressRef.current * (frames.length - 1));
        const frame = frames[index];
        if (frame) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const aspectRatio = frame.width / frame.height;
          const canvasRatio = canvas.width / canvas.height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (canvasRatio > aspectRatio) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * aspectRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / aspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
          }
          ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
      animationId = requestAnimationFrame(drawFrame);
    };

    const loadFrames = () => {
      try {
        const offscreenVideo = document.createElement('video');
        offscreenVideo.src = videoUrl;
        offscreenVideo.crossOrigin = 'anonymous';
        offscreenVideo.muted = true;
        offscreenVideo.preload = 'auto';

        offscreenVideo.addEventListener('loadeddata', () => {
          const duration = offscreenVideo.duration || 3;
          const frameStep = duration / totalFrames;
          const tempFrames = [];

          const captureFrame = (index) => {
            if (index >= totalFrames) {
              setFrames(tempFrames);
              setIsVideoReady(true);
              return;
            }
            offscreenVideo.currentTime = index * frameStep;
            offscreenVideo.addEventListener('seeked', () => {
              const offCanvas = document.createElement('canvas');
              offCanvas.width = 960;
              offCanvas.height = 540;
              const offCtx = offCanvas.getContext('2d');
              offCtx.drawImage(offscreenVideo, 0, 0, offCanvas.width, offCanvas.height);
              offCanvas.toBlob((blob) => {
                if (blob) {
                  const img = new Image();
                  img.onload = () => {
                    tempFrames.push(img);
                    captureFrame(index + 1);
                  };
                  img.src = URL.createObjectURL(blob);
                  objectUrls.push(img.src);
                } else {
                  captureFrame(index + 1);
                }
              });
            }, { once: true });
          };
          captureFrame(0);
        });

        offscreenVideo.addEventListener('error', () => {
          setIsVideoReady(false);
        });
      } catch (err) {
        console.warn('Video background fallback mode active');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    loadFrames();
    drawFrame();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setupCanvas);
      if (animationId) cancelAnimationFrame(animationId);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [frames, isVideoReady]);

  return (
    <div className="video-bg is-loaded" id="heroVideoBg">
      <div className="overlay"></div>
      <video ref={videoRef} id="heroVideo" autoPlay muted loop playsInline>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="video-canvas" />
    </div>
  );
};

export default ScrollVideo;
export { ScrollVideo };
