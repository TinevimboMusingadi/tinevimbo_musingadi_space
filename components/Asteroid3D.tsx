'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, PresentationControls } from '@react-three/drei';
import { Mesh } from 'three';

function AsteroidModel(props: any) {
  const meshRef = useRef<Mesh>(null);
  
  // Simple rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Note: In a real implementation, you'd have an actual asteroid model
  // For now, we'll use a simple mesh shape
  return (
    <mesh ref={meshRef} {...props}>
      <dodecahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#555555" 
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function Asteroid3D({ className = '' }) {
  return (
    <div className={`relative w-full h-72 ${className}`}>
      <Canvas
        camera={{ fov: 45, position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="night" />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-0.4, 0.2]}
          speed={1.5}
        >
          <Float 
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <AsteroidModel position={[0, 0, 0]} scale={1.5} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
} 