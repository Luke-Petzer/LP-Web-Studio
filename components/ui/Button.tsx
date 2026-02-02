import React from 'react';
import Link from 'next/link';
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light';
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
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[44px]'
  };
  const variantStyles = {
    primary: 'bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
    secondary: 'bg-gray-800 text-white shadow-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
    'outline-light': 'border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900'
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
    // For internal links, use Next.js Link
    return <Link href={href} className={buttonClass}>
        {children}
      </Link>;
  }
  return <button className={buttonClass} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>;
}