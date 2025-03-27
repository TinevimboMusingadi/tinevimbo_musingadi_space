'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points for stars
function getRandomPoints(count: number) {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * 50; // x
    points[i3 + 1] = (Math.random() - 0.5) * 50; // y
    points[i3 + 2] = (Math.random() - 0.5) * 50; // z
    
    // Random light colors for stars
    const color = new THREE.Color();
    const h = Math.random();
    const s = Math.random() * 0.2 + 0.8; // High saturation
    const l = Math.random() * 0.2 + 0.8; // High lightness
    color.setHSL(h, s, l);
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  return { positions: points, colors };
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate stars with positions and colors
  const { positions, colors } = useMemo(() => getRandomPoints(5000), []);
  
  // Animation loop
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });
  
  return (
    <Points ref={pointsRef} limit={5000}>
      <bufferAttribute attach="geometry-attributes-position" args={[positions, 3]} />
      <bufferAttribute attach="geometry-attributes-color" args={[colors, 3]} />
      <PointMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
      />
    </Points>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <StarField />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}