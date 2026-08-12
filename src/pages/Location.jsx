import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import gsap from 'gsap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Clock, Phone, Globe } from 'lucide-react';

// Custom Map Marker with Glowing Effect
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: 32px; 
        height: 32px; 
        background: #f97316; 
        border: 4px solid #fff; 
        border-radius: 50%; 
        box-shadow: 0 0 25px rgba(249, 115, 22, 0.8), 0 0 10px rgba(249, 115, 22, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        animation: pulse 2s infinite;
      ">
        <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
      </div>
      <style>
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const position = [9.025, 38.7469]; // Addis Ababa, Ethiopia

export default function Location() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.location-overlay-panel', 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );
      gsap.fromTo('.location-reveal-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center">
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0 opacity-80 mt-16 md:mt-0">
        <MapContainer 
          center={position} 
          zoom={14} 
          scrollWheelZoom={true} 
          zoomControl={false}
          className="w-full h-full"
          whenReady={() => setMapReady(true)}
        >
          {/* Extremely sophisticated Stamen Toner / Dark Matter Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={createCustomIcon()}>
            <Popup className="premium-popup">
              <div className="text-center font-sans p-1">
                <strong className="text-orange-500 text-lg font-black tracking-wide">GlassBite AA</strong><br />
                <span className="text-gray-600 text-sm">The Premium Experience</span>
              </div>
            </Popup>
          </Marker>
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      {/* Floating Glassmorphism Overlay Panel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-screen flex items-center pointer-events-none">
        <div className="location-overlay-panel pointer-events-auto w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,107,0,0.15)] mt-24">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] -z-10" />
          
          <h1 className="location-reveal-item font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
            Flagship <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Location</span>
          </h1>
          <p className="location-reveal-item text-gray-400 mb-8 font-light leading-relaxed">
            Experience our culinary art right in the heart of Addis Ababa.
          </p>

          <div className="space-y-6">
            <div className="location-reveal-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1">ADDRESS</h3>
                <p className="text-gray-400 text-sm">Bole Road, Olympia Area<br />Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <div className="location-reveal-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1">OPENING HOURS</h3>
                <p className="text-gray-400 text-sm">Everyday: 11:00 AM - 11:00 PM<br />Weekends: Until 1:00 AM</p>
              </div>
            </div>

            <div className="location-reveal-item flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1">RESERVATIONS</h3>
                <p className="text-gray-400 text-sm">+251 911 234 567<br />table@glassbite.et</p>
              </div>
            </div>
          </div>

          <button className="location-reveal-item mt-10 w-full burgerhub-button-primary py-4 text-sm tracking-widest flex justify-center items-center gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <Navigation className="w-4 h-4 relative z-10" />
            <span className="relative z-10">GET DIRECTIONS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
