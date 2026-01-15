"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fluidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    float m4 = m.x*m.x;
    m4 = m4*m4;
    vec3 g = a0 * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv;
    float time = uTime * 0.2;
    
    // Mouse influence
    float dist = distance(st, uMouse);
    float mouseStrength = smoothstep(0.3, 0.0, dist) * 0.5;
    
    // Create fluid-like movement using nested noise
    float n = snoise(st * 3.0 + time + snoise(st * 2.0 - time * 0.5));
    float n2 = snoise(st * 5.0 - time * 0.8 + n);
    
    vec3 color1 = vec3(0.02, 0.05, 0.15); // Deep blue
    vec3 color2 = vec3(0.1, 0.4, 0.8);    // Electric blue
    vec3 color3 = vec3(0.0, 0.8, 1.0);    // Cyan
    
    float mixFactor = n2 * 0.5 + 0.5 + mouseStrength;
    vec3 finalColor = mix(color1, color2, mixFactor);
    finalColor = mix(finalColor, color3, pow(mouseStrength, 2.0));
    
    // Add subtle flow lines
    float lines = sin(st.y * 50.0 + n * 10.0 + time * 5.0) * 0.5 + 0.5;
    finalColor += lines * 0.03;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uMouse.value.lerp(mouse.current, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function BackgroundShader() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidPlane />
      </Canvas>
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
    </div>
  );
}
