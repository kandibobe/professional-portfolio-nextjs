"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 100]}
        scale={hovered ? 1.4 : 1.2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
}

const generateCubes = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 10,
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      0,
    ] as [number, number, number],
  }));
};

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null);
  const cubes = useMemo(() => generateCubes(20), []);

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={cubesRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh
            position={cube.position}
            rotation={cube.rotation}
          >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#60A5FA" opacity={0.3} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <AnimatedSphere />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
