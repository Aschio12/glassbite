import { motion } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  className = "", 
  direction = "up", 
  delay = 0,
  duration = 0.8
}) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  };

  const startOffset = directions[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...startOffset, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
