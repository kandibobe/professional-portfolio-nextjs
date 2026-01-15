"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6, 
      wireframe: true,
      transparent: true,
      opacity: 0.2 
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add glowing points
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsMaterial = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.1 });
    
    // Random points on sphere surface
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount; i++) {
        const phi = Math.acos( -1 + ( 2 * i ) / particleCount );
        const theta = Math.sqrt( particleCount * Math.PI ) * phi;
        positions[ i * 3 ] = 2 * Math.cos( theta ) * Math.sin( phi );
        positions[ i * 3 + 1 ] = 2 * Math.sin( theta ) * Math.sin( phi );
        positions[ i * 3 + 2 ] = 2 * Math.cos( phi );
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    globe.add(points);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="w-[400px] h-[400px] mx-auto opacity-50" />;
}
