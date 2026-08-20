import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * ScrollScene: Real-time WebGL canvas driven by scroll position.
 * Visual content: Cables with glowing emissive tips at scroll=0 morphing
 * into a faceted crystalline verified passport structure with an illuminated core light at scroll=1.
 */
const ScrollScene = () => {
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);
  const { smoothedProgress } = useScrollProgress();
  const smoothedRef = useRef(0);
  smoothedRef.current = smoothedProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera, animationFrameId;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      // 1. Scene & Renderer setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      scene.fog = new THREE.FogExp2(0x0a0a0a, 0.035);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 2. Lighting
      const ambientLight = new THREE.AmbientLight(0x22153b, 1.2);
      scene.add(ambientLight);

      const topLight = new THREE.DirectionalLight(0x9d4edd, 2.5);
      topLight.position.set(5, 10, 7);
      scene.add(topLight);

      const fillLight = new THREE.DirectionalLight(0x5e0ed7, 1.8);
      fillLight.position.set(-5, -5, 5);
      scene.add(fillLight);

      // Core point light that intensifies upon verification
      const coreLight = new THREE.PointLight(0xffffff, 0, 20);
      coreLight.position.set(0, 0, 0);
      scene.add(coreLight);

      // 3. Central Morphing Geometry (Cables State <-> Faceted Crystalline State)
      const isMobile = window.innerWidth < 640;
      const subdivision = isMobile ? 3 : 4;
      const baseGeometry = new THREE.IcosahedronGeometry(2.8, subdivision);
      const posAttr = baseGeometry.attributes.position;
      const vertexCount = posAttr.count;

      // Create initial cable positions and crystal target positions
      const cablePositions = new Float32Array(vertexCount * 3);
      const crystalPositions = new Float32Array(vertexCount * 3);
      const currentPositions = new Float32Array(vertexCount * 3);

      for (let i = 0; i < vertexCount; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);

        // Target: Faceted crystalline form with subtle vertex noise
        crystalPositions[i * 3] = x;
        crystalPositions[i * 3 + 1] = y;
        crystalPositions[i * 3 + 2] = z;

        // Origin (Scroll 0): Hanging dispersed cable lines
        const strandIndex = i % 18;
        const angle = (strandIndex / 18) * Math.PI * 2;
        const radius = 1.2 + (i % 5) * 0.4;
        const hangY = 6.5 - ((i % 30) / 30) * 8.5;
        
        cablePositions[i * 3] = Math.cos(angle) * radius + Math.sin(hangY * 0.5) * 0.3;
        cablePositions[i * 3 + 1] = hangY;
        cablePositions[i * 3 + 2] = Math.sin(angle) * radius;

        // Initialize current
        currentPositions[i * 3] = cablePositions[i * 3];
        currentPositions[i * 3 + 1] = cablePositions[i * 3 + 1];
        currentPositions[i * 3 + 2] = cablePositions[i * 3 + 2];
      }

      const dynamicGeometry = new THREE.BufferGeometry();
      dynamicGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      dynamicGeometry.setIndex(baseGeometry.getIndex());

      // Faceted Mesh Material
      const crystalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x5e0ed7,
        emissive: 0x240046,
        roughness: 0.15,
        metalness: 0.85,
        transmission: 0.4,
        ior: 1.5,
        flatShading: true,
        transparent: true,
        opacity: 0.9,
      });

      const crystalMesh = new THREE.Mesh(dynamicGeometry, crystalMaterial);
      scene.add(crystalMesh);

      // Wireframe overlay for technical blueprint aesthetics
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const wireframeMesh = new THREE.Mesh(dynamicGeometry, wireframeMaterial);
      scene.add(wireframeMesh);

      // 4. Emissive Spherical Tips (Unverified Signals -> Anchored Nodes)
      const tipCount = isMobile ? 18 : 36;
      const tipGroup = new THREE.Group();
      const tipGeometry = new THREE.SphereGeometry(0.09, 16, 16);
      const tipMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d9b5,
        emissive: 0x00d9b5,
        emissiveIntensity: 3,
        roughness: 0.2,
      });

      const tipMeshes = [];
      for (let i = 0; i < tipCount; i++) {
        const mesh = new THREE.Mesh(tipGeometry, tipMaterial);
        tipGroup.add(mesh);
        tipMeshes.push(mesh);
      }
      scene.add(tipGroup);

      // 5. Ambient Bokeh Particles Field
      const particleCount = isMobile ? 80 : 180;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleVelocities = [];

      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 28;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

        particleVelocities.push({
          x: (Math.random() - 0.5) * 0.004,
          y: (Math.random() - 0.5) * 0.005 + 0.002,
          z: (Math.random() - 0.5) * 0.004,
        });
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      // Circular glowing particle texture
      const canvasTexture = document.createElement('canvas');
      canvasTexture.width = 64;
      canvasTexture.height = 64;
      const ctx = canvasTexture.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(124, 58, 237, 1)');
      grad.addColorStop(0.35, 'rgba(94, 14, 215, 0.6)');
      grad.addColorStop(1, 'rgba(10, 10, 15, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const spriteTexture = new THREE.CanvasTexture(canvasTexture);

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.45,
        map: spriteTexture,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particlePoints);

      // 6. Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        if (!isVisible) return;
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        const t = Math.min(Math.max(smoothedRef.current, 0), 1);

        // Morph vertices between cable state (0) and crystal state (1)
        const posArray = dynamicGeometry.attributes.position.array;
        for (let i = 0; i < vertexCount; i++) {
          const idx = i * 3;
          posArray[idx] = cablePositions[idx] + (crystalPositions[idx] - cablePositions[idx]) * t;
          posArray[idx + 1] = cablePositions[idx + 1] + (crystalPositions[idx + 1] - cablePositions[idx + 1]) * t;
          posArray[idx + 2] = cablePositions[idx + 2] + (crystalPositions[idx + 2] - cablePositions[idx + 2]) * t;
        }
        dynamicGeometry.attributes.position.needsUpdate = true;
        dynamicGeometry.computeVertexNormals();

        // Update tips
        for (let i = 0; i < tipCount; i++) {
          const vertexIdx = (i * 12) % vertexCount;
          tipMeshes[i].position.set(
            posArray[vertexIdx * 3],
            posArray[vertexIdx * 3 + 1],
            posArray[vertexIdx * 3 + 2]
          );
          // Scale tips based on verification state
          const tipScale = 1 + t * 0.4 + Math.sin(elapsedTime * 3 + i) * 0.15;
          tipMeshes[i].scale.set(tipScale, tipScale, tipScale);
        }

        // Camera position lerp driven by scroll
        // t=0: pulled back at (0, 0.5, 14)
        // t=1: angled close-up at (1.5, -0.2, 9.5)
        const targetCamX = (1 - t) * 0 + t * 1.6;
        const targetCamY = (1 - t) * 0.6 + t * -0.3;
        const targetCamZ = (1 - t) * 14 + t * 9.2;

        if (!prefersReducedMotion) {
          // Continuous idle rotation and subtle camera bob
          crystalMesh.rotation.y = elapsedTime * 0.04 + t * Math.PI * 0.8;
          crystalMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.08 + t * 0.35;
          wireframeMesh.rotation.copy(crystalMesh.rotation);
          tipGroup.rotation.copy(crystalMesh.rotation);

          camera.position.x = targetCamX + Math.sin(elapsedTime * 0.4) * 0.1;
          camera.position.y = targetCamY + Math.cos(elapsedTime * 0.5) * 0.12;
          camera.position.z = targetCamZ;

          // Drift bokeh particles
          const pPositions = particleGeometry.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            const v = particleVelocities[i];
            pPositions[i * 3] += v.x;
            pPositions[i * 3 + 1] += v.y;
            pPositions[i * 3 + 2] += v.z;

            if (pPositions[i * 3 + 1] > 10) pPositions[i * 3 + 1] = -10;
            if (pPositions[i * 3] > 14) pPositions[i * 3] = -14;
            if (pPositions[i * 3] < -14) pPositions[i * 3] = 14;
          }
          particleGeometry.attributes.position.needsUpdate = true;
        } else {
          camera.position.set(targetCamX, targetCamY, targetCamZ);
        }

        // Core light intensity transitions to full as t -> 1
        coreLight.intensity = t * 4.5;
        crystalMaterial.emissiveIntensity = 0.5 + t * 1.5;

        renderer.render(scene, camera);
      };

      animate();

      // 7. Resize Handler
      const handleResize = () => {
        if (!canvas) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      // 8. Visibility Change Handler
      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
        if (isVisible) {
          clock.start();
          animate();
        }
      };

      window.addEventListener('resize', handleResize, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // Dispose Three.js resources
        dynamicGeometry.dispose();
        baseGeometry.dispose();
        crystalMaterial.dispose();
        wireframeMaterial.dispose();
        tipGeometry.dispose();
        tipMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        spriteTexture.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to static poster:', err);
      if (fallbackRef.current) fallbackRef.current.style.display = 'block';
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0A0A0A]" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Fallback Static Gradient Canvas if WebGL unsupported */}
      <div
        ref={fallbackRef}
        className="hidden absolute inset-0 bg-gradient-to-br from-[#12042b] via-[#0a0a0a] to-[#1e0747]"
      />
    </div>
  );
};

export default ScrollScene;
