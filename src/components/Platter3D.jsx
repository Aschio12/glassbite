import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html, useGLTF } from '@react-three/drei';
import { formatPrice } from '../data/menuData.js';

function FoodModel({ url, scale, fallbackShape, color }) {
  try {
    const { scene } = useGLTF(url);
    // Clone scene to avoid sharing the exact same instance if multiple are rendered
    return <primitive object={scene.clone()} scale={scale} />;
  } catch (e) {
    // Fallback to primitive if network blocks GLTF loading
    if (fallbackShape === 'burger') {
       return (
        <group position={[0, 0.4, 0]} scale={scale * 3}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
            <meshStandardMaterial color="#fcd34d" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.85, 0.85, 0.2, 32]} />
            <meshStandardMaterial color={color || '#ef4444'} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
            <meshStandardMaterial color="#fcd34d" roughness={0.7} />
          </mesh>
        </group>
      );
    }
    return (
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#fb923c" roughness={0.5} />
      </mesh>
    );
  }
}

// Preload the most common ones
useGLTF.preload('https://vazxmixizvqrz.supabase.co/storage/v1/object/public/models/hamburger/model.gltf');
useGLTF.preload('https://vazxmixizvqrz.supabase.co/storage/v1/object/public/models/hot-dog/model.gltf');
useGLTF.preload('https://vazxmixizvqrz.supabase.co/storage/v1/object/public/models/cup-tea/model.gltf');


export default function Platter3D({ item, position, onOpen, onAdd }) {
  const group = useRef();
  const [hovered, setHover] = useState(false);

  // Slow continuous rotation when not hovered
  useFrame((state, delta) => {
    if (!hovered && group.current) {
      group.current.rotation.y += delta * 0.5;
    } else if (hovered && group.current) {
      // Gently sway when hovered
      group.current.rotation.y += Math.sin(state.clock.elapsedTime * 2) * 0.005;
    }
  });

  return (
    <group 
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => onOpen(item)}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={group} scale={hovered ? 1.1 : 1}>
          
          {/* The Plate / Platter (Dark marble / Slate look) */}
          <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.3, 0.1, 64]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
          </mesh>
          
          {/* The Photorealistic Food Model */}
          <group castShadow>
            <Suspense fallback={<Html><div className="text-white">Loading 3D...</div></Html>}>
              {item.model && (
                <FoodModel 
                  url={item.model.url} 
                  scale={item.model.scale || 1} 
                  fallbackShape={item.model.shape}
                />
              )}
            </Suspense>
          </group>

        </group>
      </Float>

      {/* HTML Overlay for Text */}
      <Html position={[0, -2.5, 0]} center transform style={{ width: '300px', pointerEvents: 'none' }}>
        <div className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-80'} text-center bg-black/40 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50`}>
          <h3 className="font-display text-2xl font-extrabold text-white drop-shadow-md">{item.title}</h3>
          <p className="text-amber-400 font-bold mt-1">{formatPrice(item.price)}</p>
          <div className="mt-4 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(item);
              }}
              className="bg-gradient-to-br from-amber-600 to-red-700 text-white px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(251,146,60,0.3)] hover:scale-105 transition-transform"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
