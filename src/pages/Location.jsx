import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import gsap from 'gsap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const position = [40.7128, -74.0060]; // NYC coords for demo

export default function Location() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.location-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative flex flex-col items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10 w-full text-center">
        <h1 className="location-reveal font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
          Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Us</span>
        </h1>
        
        <p className="location-reveal text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-12">
          123 Culinary Avenue, New York, NY 10001
        </p>

        <div className="location-reveal w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,107,0,0.15)] relative z-20">
          <MapContainer 
            center={position} 
            zoom={15} 
            scrollWheelZoom={false} 
            className="w-full h-full"
          >
            {/* Dark Mode Tile Layer from CartoDB */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-center font-sans">
                  <strong className="text-orange-500 text-lg">GlassBite</strong><br />
                  123 Culinary Ave.<br />
                  Best burgers in town.
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
