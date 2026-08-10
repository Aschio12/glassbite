import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, ContactShadows } from '@react-three/drei';
import Platter3D from './Platter3D.jsx';
import { Suspense } from 'react';

export default function Scene({ items, onOpen, onAdd }) {
  // Calculate how many pages we need based on the number of items.
  const itemSpacing = 5;
  const pages = Math.max(1, (items.length * itemSpacing) / 8);

  if (items.length === 0) {
    return (
      <div className="w-full text-center py-20 text-slate-500">
        No items found in this category.
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] mt-10 relative cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <Suspense fallback={null}>
          {/* Very dark restaurant environment (studio/night) */}
          <Environment preset="studio" blur={1} background={false} />
          
          <ambientLight intensity={0.1} />
          <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} castShadow />
          <spotLight position={[-5, 5, -5]} angle={0.5} penumbra={1} intensity={0.5} color="#4f46e5" />

          {/* The dark wooden/marble table surface */}
          <mesh position={[0, -0.3, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.1} />
          </mesh>

          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />

          <ScrollControls horizontal pages={pages} damping={0.25}>
            <Scroll>
              {items.map((item, index) => (
                <Platter3D 
                  key={item.id} 
                  item={item} 
                  position={[index * itemSpacing, 0, 0]} 
                  onOpen={onOpen}
                  onAdd={onAdd}
                />
              ))}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none text-slate-500 text-sm tracking-widest uppercase">
        Drag to explore menu
      </div>
    </div>
  );
}
