import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import gsap from 'gsap';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { MapPin, Navigation, Clock, Phone, X, Volume2 } from 'lucide-react';

// Custom Map Marker with Glowing Effect
const createCustomIcon = (isUser = false) => {
  const color = isUser ? '#3b82f6' : '#f97316'; // Blue for user, Orange for destination
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: 32px; 
        height: 32px; 
        background: ${color}; 
        border: 4px solid #fff; 
        border-radius: 50%; 
        box-shadow: 0 0 25px ${color}cc, 0 0 10px ${color};
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
          0% { box-shadow: 0 0 0 0 ${color}aa; }
          70% { box-shadow: 0 0 0 20px ${color}00; }
          100% { box-shadow: 0 0 0 0 ${color}00; }
        }
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const DESTINATION = [9.025, 38.7469]; // Addis Ababa, Ethiopia

function RoutingControl({ userLocation, destination, onInstructionChange }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  // Setup / Teardown
  useEffect(() => {
    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1])
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      show: false, // hide the text directions panel for a cleaner look
      createMarker: () => null, // disable default markers, we handle our own
      lineOptions: {
        styles: [{ color: '#f97316', weight: 6, opacity: 0.8 }]
      }
    }).addTo(map);

    // Center map slightly to fit route better when first found
    map.fitBounds([userLocation, destination], { padding: [50, 50] });

    routingControlRef.current.on('routesfound', (e) => {
      const routes = e.routes;
      if (routes && routes.length > 0) {
        const instructions = routes[0].instructions;
        if (instructions && instructions.length > 0 && onInstructionChange) {
           onInstructionChange(instructions[0]);
        }
      }
    });

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch(e) {}
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, destination]); // Only run on mount, setup control once

  // Update waypoints on user location change
  useEffect(() => {
    if (routingControlRef.current && userLocation) {
      routingControlRef.current.setWaypoints([
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1])
      ]);
    }
  }, [userLocation, destination]);

  return null;
}

function CustomZoomControls() {
  const map = useMap();
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-[1000] flex flex-row gap-4 pointer-events-auto">
      <button 
        onClick={() => map.zoomIn()}
        className="w-14 h-14 bg-orange-600 border-2 border-orange-400 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all shadow-[0_10px_20px_rgba(255,107,0,0.4)] group"
      >
        <span className="text-3xl font-black group-hover:scale-110 transition-transform">+</span>
      </button>
      <button 
        onClick={() => map.zoomOut()}
        className="w-14 h-14 bg-orange-600 border-2 border-orange-400 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all shadow-[0_10px_20px_rgba(255,107,0,0.4)] group"
      >
        <span className="text-3xl font-black group-hover:scale-110 transition-transform">-</span>
      </button>
      <style>{`
        .leaflet-routing-container {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

export default function Location() {
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  const [currentInstruction, setCurrentInstruction] = useState(null);

  const startTracking = () => {
    if (trackingId !== null) return; // already tracking

    if ('geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error watching location:", err);
          alert("Could not access your location. Please check permissions.");
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
      setTrackingId(id);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const cancelTracking = () => {
    if (trackingId !== null) {
      navigator.geolocation.clearWatch(trackingId);
      setTrackingId(null);
    }
    setUserLocation(null);
    setCurrentInstruction(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleInstructionChange = (instruction) => {
    if (!instruction) return;
    
    // Only speak if it's a new instruction
    setCurrentInstruction((prev) => {
      if (!prev || prev.text !== instruction.text) {
        // Speak the instruction
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // clear previous
          const utterance = new SpeechSynthesisUtterance(instruction.text);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
        return instruction;
      }
      return prev;
    });
  };

  useEffect(() => {
    return () => {
      if (trackingId !== null) {
        navigator.geolocation.clearWatch(trackingId);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [trackingId]);

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
          center={DESTINATION} 
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
          
          <Marker position={DESTINATION} icon={createCustomIcon(false)}>
            <Popup className="premium-popup">
              <div className="text-center font-sans p-1">
                <strong className="text-orange-500 text-lg font-black tracking-wide">GlassBite AA</strong><br />
                <span className="text-gray-600 text-sm">The Premium Experience</span>
              </div>
            </Popup>
          </Marker>

          {userLocation && (
            <Marker position={userLocation} icon={createCustomIcon(true)}>
              <Popup className="premium-popup">
                <div className="text-center font-sans p-1">
                  <strong className="text-blue-500 text-lg font-black tracking-wide">You</strong><br />
                  <span className="text-gray-600 text-sm">Your live location</span>
                </div>
              </Popup>
            </Marker>
          )}

          {userLocation && mapReady && (
            <RoutingControl 
              userLocation={userLocation} 
              destination={DESTINATION} 
              onInstructionChange={handleInstructionChange}
            />
          )}

          {/* Custom Zoom Controls */}
          <CustomZoomControls />
        </MapContainer>
      </div>

      {/* Turn-by-Turn Instruction Banner (Top Center) */}
      {currentInstruction && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-2xl border border-orange-500/30 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,107,0,0.2)] flex items-center gap-6 animate-[slideDown_0.5s_ease-out]">
            <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 text-orange-500 relative">
              <Volume2 className="w-7 h-7" />
              <div className="absolute inset-0 border border-orange-500 rounded-full animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-orange-500 font-bold text-sm tracking-widest mb-1 uppercase">Next Maneuver</p>
              <h2 className="text-white text-xl md:text-2xl font-display font-medium leading-tight">
                {currentInstruction.text}
              </h2>
              {currentInstruction.distance && (
                <p className="text-gray-400 text-sm mt-1">in {Math.round(currentInstruction.distance)} meters</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Glassmorphism Overlay Panel - Positioned Bottom Left */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 w-full max-w-md pointer-events-none">
        <div className="location-overlay-panel pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,107,0,0.15)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] -z-10" />
          
          <h1 className="location-reveal-item font-display text-4xl font-black uppercase tracking-normal text-white mb-2">
            Flagship <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Location</span>
          </h1>
          <p className="location-reveal-item text-gray-400 mb-6 font-light leading-relaxed text-sm">
            Experience our culinary art right in the heart of Addis Ababa.
          </p>

          <div className="space-y-4">
            <div className="location-reveal-item flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1 text-sm">ADDRESS</h3>
                <p className="text-gray-400 text-xs">Bole Road, Olympia Area<br />Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <div className="location-reveal-item flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1 text-sm">HOURS</h3>
                <p className="text-gray-400 text-xs">Everyday: 11:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div className="location-reveal-item flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 text-orange-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-1 text-sm">RESERVATIONS</h3>
                <p className="text-gray-400 text-xs">+251 911 234 567</p>
              </div>
            </div>
          </div>

          <div className="location-reveal-item mt-8 flex flex-col gap-3">
            <button 
              onClick={startTracking}
              disabled={trackingId !== null}
              className="w-full burgerhub-button-primary py-3 text-sm tracking-widest flex justify-center items-center gap-2 relative overflow-hidden group disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              <Navigation className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{trackingId !== null ? 'ROUTING ACTIVE' : 'GET DIRECTIONS'}</span>
            </button>
            
            {trackingId !== null && (
              <button 
                onClick={cancelTracking}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 py-3 rounded-full text-sm font-bold tracking-widest flex justify-center items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                CANCEL NAVIGATION
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
