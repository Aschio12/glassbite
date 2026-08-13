import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import gsap from 'gsap';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

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

function RoutingControl({ userLocation, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !destination) return;

    // Center map slightly to fit route better when first found
    map.fitBounds([userLocation, destination], { padding: [50, 50] });

    const routingControl = L.Routing.control({
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

    return () => {
      try {
        map.removeControl(routingControl);
      } catch(e) {
        // ignore issues on unmount
      }
    };
  }, [map, userLocation, destination]);

  return null;
}

export default function Location() {
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

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

  useEffect(() => {
    return () => {
      if (trackingId !== null) {
        navigator.geolocation.clearWatch(trackingId);
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
            <RoutingControl userLocation={userLocation} destination={DESTINATION} />
          )}

          <ZoomControl position="topright" />
        </MapContainer>
      </div>

      {/* Floating Glassmorphism Overlay Panel - Positioned Bottom Left */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 w-full max-w-md pointer-events-none">
        <div className="location-overlay-panel pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,107,0,0.15)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] -z-10" />
          
          <h1 className="location-reveal-item font-display text-4xl font-black uppercase tracking-tighter text-white mb-2">
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

          <button 
            onClick={startTracking}
            disabled={trackingId !== null}
            className="location-reveal-item mt-8 w-full burgerhub-button-primary py-3 text-sm tracking-widest flex justify-center items-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <Navigation className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{trackingId !== null ? 'ROUTING...' : 'GET DIRECTIONS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
