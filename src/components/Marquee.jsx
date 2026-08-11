export default function Marquee() {
  // We duplicate the text multiple times to ensure smooth infinite scroll
  const marqueeText = "• PREMIUM INGREDIENTS • 100% WAGYU BEEF • WOOD-FIRED PIZZAS • ICE COLD DRINKS • NO COMPROMISES • FRESH DAILY ";
  
  return (
    <div className="relative flex overflow-x-hidden bg-amber-500 py-3 text-black">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 font-display text-xl uppercase tracking-wider">{marqueeText}</span>
        <span className="mx-4 font-display text-xl uppercase tracking-wider">{marqueeText}</span>
        <span className="mx-4 font-display text-xl uppercase tracking-wider">{marqueeText}</span>
        <span className="mx-4 font-display text-xl uppercase tracking-wider">{marqueeText}</span>
      </div>
    </div>
  );
}
