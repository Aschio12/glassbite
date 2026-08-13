import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Info, ShoppingBag } from 'lucide-react';

export default function BottomNav({ cartCount, onCartOpen }) {
  const location = useLocation();

  const links = [
    { name: 'Menu', path: '/', icon: Home },
    { name: 'Location', path: '/location', icon: Map },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-t border-[#222222] pb-safe">
      <nav className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{link.name}</span>
            </Link>
          );
        })}
        
        {/* Cart Button */}
        <button
          onClick={onCartOpen}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-white transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white shadow-[0_0_8px_rgba(255,107,0,0.6)]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Bag</span>
        </button>
      </nav>
    </div>
  );
}
