import React from 'react';
import { Link } from 'react-router-dom';
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'inline-block font-medium rounded-md text-center';
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  const variantStyles = {
    primary: 'bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed',
    secondary: 'bg-gray-800 text-white shadow-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
  };
  const buttonClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  // Use React Router Link for internal navigation
  if (href) {
    // Check if it's an external link
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return <a href={href} className={buttonClass} target="_blank" rel="noopener noreferrer">
          {children}
        </a>;
    }
    // For internal links, use React Router Link
    return <Link to={href} className={buttonClass}>
        {children}
      </Link>;
  }
  return <button className={buttonClass} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>;
}