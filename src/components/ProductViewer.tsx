'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type GeoType = 'bags' | 'wallets' | 'belts' | 'accessories';

function ProductMesh({ color, category }: { color: string; category: GeoType }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.8, metalness: 0.05 }), [color]);

  useFrame((_, delta) => { if (meshRef.current) meshRef.current.rotation.y += delta * 0.3; });

  const geometry = useMemo(() => {
    switch (category) {
      case 'bags': return <boxGeometry args={[2.2, 2.8, 1.2, 4, 4, 4]} />;
      case 'wallets': return <boxGeometry args={[3, 2, 0.3, 4, 4, 4]} />;
      case 'belts': return <torusGeometry args={[1.5, 0.15, 16, 100]} />;
      case 'accessories': return <dodecahedronGeometry args={[1.5, 0]} />;
      default: return <boxGeometry args={[2, 2, 2]} />;
    }
  }, [category]);

  return <mesh ref={meshRef} material={material} castShadow>{geometry}</mesh>;
}

export default function ProductViewer({ color, category }: { color: string; category: string }) {
  return (
    <div className="w-full aspect-square bg-surface-alt rounded-sm overflow-hidden border border-subtle">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#f0e8d8" />
        <directionalLight position={[-3, 2, -5]} intensity={0.3} color="#c8a05a" />
        <ProductMesh color={color} category={category as GeoType} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI * 3 / 4} />
        <hemisphereLight args={['#ffffff', '#f0e8d8', 0.5]} />
        <spotLight position={[0, 5, 2]} intensity={0.5} angle={0.5} penumbra={0.5} />
      </Canvas>
    </div>
  );
}
