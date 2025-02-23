import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book } from 'lucide-react';

interface LogoProps {
  withTagline?: boolean;
  withQuote?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  withTagline = true, 
  withQuote = true, 
  className = '' 
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <NavLink to="/"
        className="group inline-flex items-center gap-4 hover:opacity-90 transition-all"
      >
        {/* Logo Container */}
        <div className="relative">
          {/* Circle decoration */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600/20 to-amber-800/20 
            blur-md transform group-hover:scale-110 transition-transform duration-300" 
          />

          {/* Icon of the book with effects */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full 
            bg-gradient-to-br from-amber-900 to-amber-700
            shadow-lg shadow-amber-900/30">
            <Book className="w-6 h-6 text-amber-100 transform 
              group-hover:scale-110 group-hover:rotate-[-8deg] 
              transition-all duration-300" 
            />

            {/* Decorative particles */}
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full 
              bg-amber-400 animate-pulse" 
            />
            <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full 
              bg-amber-300 animate-pulse delay-150" 
            />
          </div>
        </div>

        {/* Logo text */}
        <div className="flex flex-col">
          <span className="text-3xl font-serif font-bold tracking-wide
            bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 
            bg-clip-text text-transparent
            transform group-hover:scale-105 transition-transform duration-300">
            Sahifat
          </span>
          {withTagline && (
            <span className="text-xs font-serif text-amber-400 tracking-wider uppercase">
              Digital Library
            </span>
          )}
        </div>
      </NavLink>

      {/* Improved style description */}
      {withQuote && (
        <>
          <div className="relative">
            {/* Decorative quotes */}
            <span className="absolute -top-4 -left-2 text-4xl font-serif text-amber-600/20">"</span>
            <p className="text-sm leading-relaxed font-serif text-amber-700 dark:text-amber-200/70 italic pl-4">
              A journey through the pages, an infinite library at your fingertips.
            </p>
            <span className="absolute -bottom-4 -right-2 text-4xl font-serif text-amber-600/20">"</span>
          </div>

          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-transparent" />
        </>
      )}
    </div>
  );
};

export default Logo;