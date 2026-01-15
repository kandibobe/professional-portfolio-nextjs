'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const createParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    ),
    vel: new THREE.Vector3(
      (Math.random() - 0.5) * 0.005,
      (Math.random() - 0.5) * 0.005,
      (Math.random() - 0.5) * 0.005
    ),
  }));
};

// Advanced Plexus using Lines and BufferGeometry for performance
function Plexus() {
  const count = 50;
  const particles = useMemo(() => createParticles(count), [count]);

  const lineRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const pointsPositions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(() => {
    const linePositions = [];
    const lineColors = [];
    const maxDist = 4;

    particles.forEach((p, i) => {
      p.pos.add(p.vel);
      if (Math.abs(p.pos.x) > 6) p.vel.x *= -1;
      if (Math.abs(p.pos.y) > 6) p.vel.y *= -1;
      if (Math.abs(p.pos.z) > 6) p.vel.z *= -1;

      pointsPositions[i * 3] = p.pos.x;
      pointsPositions[i * 3 + 1] = p.pos.y;
      pointsPositions[i * 3 + 2] = p.pos.z;
    });

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].pos.distanceTo(particles[j].pos);
        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;
          linePositions.push(particles[i].pos.x, particles[i].pos.y, particles[i].pos.z);
          linePositions.push(particles[j].pos.x, particles[j].pos.y, particles[j].pos.z);
          lineColors.push(0.5, 0.5, 1, alpha * 0.2);
          lineColors.push(0.5, 0.5, 1, alpha * 0.2);
        }
      }
    }

    if (lineRef.current) {
      lineRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineRef.current.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(lineColors, 4)
      );
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(pointsPositions, 3)
      );
    }
  });

  return (
    <group>
      <Points ref={pointsRef}>
        <bufferGeometry />
        <PointMaterial
          transparent
          color="#818cf8"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#818cf8" />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          color="#22d3ee"
        />
        <Plexus />
        <FloatingCore />
      </Canvas>
    </div>
  );
}
