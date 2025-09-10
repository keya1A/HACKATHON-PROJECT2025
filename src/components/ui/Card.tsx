import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false, 
  onClick 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden';
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';

  const CardComponent = onClick || hover ? motion.div : 'div';
  const motionProps = onClick || hover ? {
    whileHover: { scale: 1.02 },
    whileTap: onClick ? { scale: 0.98 } : undefined
  } : {};

  return (
    <CardComponent
      className={clsx(baseClasses, hoverClasses, className)}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
};

export default Card;