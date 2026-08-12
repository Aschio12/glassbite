import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-16 px-6 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.3)]">
              <span className="font-black text-white text-xl">G</span>
            </div>
            <span className="font-display font-black tracking-tight text-white text-2xl uppercase">GlassBite</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Elevating fast food into a culinary art form. Premium ingredients, bold flavors, and an unforgettable dining experience.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold mb-6 tracking-wide">VISIT US</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2 hover:text-orange-500 transition-colors cursor-pointer">
              <MapPin className="w-4 h-4 mt-0.5 text-orange-500" />
              123 Culinary Avenue, NY 10001
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-pointer">
              <Phone className="w-4 h-4 text-orange-500" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-pointer">
              <Mail className="w-4 h-4 text-orange-500" />
              hello@glassbite.com
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold mb-6 tracking-wide">HOURS</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Mon - Thu</span>
              <span className="text-white">11:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Fri - Sat</span>
              <span className="text-white">11:00 AM - 12:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Sunday</span>
              <span className="text-white">12:00 PM - 9:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold mb-6 tracking-wide">CONNECT</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-gray-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-gray-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-gray-400">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GlassBite. All rights reserved.</p>
      </div>
    </footer>
  );
}
