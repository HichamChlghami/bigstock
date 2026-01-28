import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg",
    secondary: "bg-primary text-white hover:bg-gray-800",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    ghost: "text-primary hover:bg-gray-100"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 rounded-sm",
    md: "text-sm px-6 py-3 rounded-md",
    lg: "text-base px-8 py-4 rounded-md"
  };

  return (
    <button 
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
