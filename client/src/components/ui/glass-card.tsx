import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

function GlassCard({ 
  children, 
  className = "", 
  hoverEffect = false,
  onClick
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-xl ${hoverEffect ? "hover:-translate-y-1 hover:shadow-lg" : ""} ${className}`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard; // Добавляем дефолтный экспорт
