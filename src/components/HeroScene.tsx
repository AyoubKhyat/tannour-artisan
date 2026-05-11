'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function LeatherBag({ mousePos, intro }: { mousePos: { x: number; y: number }; intro: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const leatherMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#6B4423'),
      roughness: 0.85,
      metalness: 0.05,
      bumpScale: 0.02,
    });
  }, []);

  const claspMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#c8a05a',
      metalness: 0.8,
      roughness: 0.3,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    targetRotation.current.y = mousePos.x * 0.3;
    targetRotation.current.x = mousePos.y * 0.15;

    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * delta * 2;
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * delta * 2;
    meshRef.current.rotation.y += delta * 0.15;

    const scale = THREE.MathUtils.lerp(0, 1, Math.min(1, intro));
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = (1 - intro) * 3;
    groupRef.current.rotation.z = (1 - intro) * 0.5;

    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} material={leatherMaterial} castShadow>
        <boxGeometry args={[2.2, 2.8, 1.2, 4, 4, 4]} />
      </mesh>
      <mesh position={[0, 1.6, 0]} material={leatherMaterial}>
        <torusGeometry args={[0.8, 0.08, 8, 32, Math.PI]} />
      </mesh>
      <mesh position={[0, 0, 0.65]} material={claspMaterial}>
        <boxGeometry args={[0.4, 0.25, 0.05]} />
      </mesh>
    </group>
  );
}

function FloatingParticles({ intro }: { intro: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * 0.3 + i) * 0.4;
      arr[i * 3] = positions[i * 3] + Math.cos(t * 0.2 + i * 0.5) * 0.2;
    }
    posAttr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = Math.min(1, intro * 1.5) * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#c8a05a" size={0.04} transparent opacity={0} sizeAttenuation />
    </points>
  );
}

function ScrollParticles({ scroll }: { scroll: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 8;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 8;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const explodeFactor = Math.max(0, (scroll - 0.3) * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = positions[i * 3] + velocities[i * 3] * explodeFactor;
      arr[i * 3 + 1] = positions[i * 3 + 1] + velocities[i * 3 + 1] * explodeFactor;
      arr[i * 3 + 2] = positions[i * 3 + 2] + velocities[i * 3 + 2] * explodeFactor;
    }
    posAttr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = explodeFactor > 0 ? Math.min(1, explodeFactor * 2) : 0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#c8a05a" size={0.03} transparent opacity={0} sizeAttenuation />
    </points>
  );
}

function Scene({ mousePos, scroll, intro }: { mousePos: { x: number; y: number }; scroll: number; intro: number }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.z = 6 - scroll * 3;
  });

  const bagOpacity = Math.max(0, 1 - scroll * 3);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#f0e8d8" />
      <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#c8a05a" />
      <spotLight position={[0, 5, 3]} intensity={0.6} angle={0.4} penumbra={0.5} color="#f0e8d8" />
      <hemisphereLight args={['#ffffff', '#f0e8d8', 0.5]} />

      <group scale={bagOpacity > 0.01 ? [1, 1, 1] : [0, 0, 0]}>
        <LeatherBag mousePos={mousePos} intro={intro} />
      </group>

      <FloatingParticles intro={intro} />
      <ScrollParticles scroll={scroll} />
    </>
  );
}

export default function HeroScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [intro, setIntro] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    let animId: number;
    const animate = () => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const progress = Math.min(1, elapsed / 2);
      const eased = 1 - Math.pow(1 - progress, 3);
      setIntro(eased);
      if (progress < 1) animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleScroll = () => {
      setScroll(window.scrollY / window.innerHeight);
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouse);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dpr: [number, number] = typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1] : [1, 2];

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={dpr}
        style={{ background: 'transparent' }}
      >
        <Scene mousePos={mousePos} scroll={scroll} intro={intro} />
      </Canvas>
    </div>
  );
}
