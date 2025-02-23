import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Users, Mail, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const links = [
  { href: '/', label: 'Home', icon: Home, color: 'from-amber-400 to-amber-600' },
  { href: '/books', label: 'Books', icon: BookOpen, color: 'from-amber-500 to-amber-700' },
  { href: '/about', label: 'About', icon: Users, color: 'from-amber-600 to-amber-800' },
  { href: '/contact', label: 'Contact', icon: Mail, color: 'from-amber-700 to-amber-900' },
];

export const MobileMenu = ({ isOpen, onToggle }: MobileMenuProps) => {
  const [isMenuIcon, setIsMenuIcon] = useState(true);

  const handleClick = () => {
    setIsMenuIcon(!isMenuIcon);
    onToggle();
  };

  return (
    <div className="md:hidden">
      {/* Toggle Button avec animation */}
      <button
        onClick={handleClick}
        className="relative p-2.5 rounded-xl overflow-hidden
          bg-amber-100 dark:bg-amber-900/20
          transition-all duration-300 group"
        aria-label={isMenuIcon ? 'Open Menu' : 'Close Menu'}
      >
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icône avec rotation */}
        <div className="relative transform transition-transform duration-500">
          {isMenuIcon ? (
            <Menu className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          ) : (
            <X className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          )}
        </div>
      </button>

      {/* Overlay with blur */}
      <div
        className={`fixed inset-0 bg-amber-950/30 backdrop-blur-sm transition-all duration-500
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClick}
      />

      {/* Menu panel with improved design */}
      <div className={`
        fixed top-0 right-0 bottom-0
        w-[300px] max-w-[80vw]
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur-lg
        shadow-[0_0_40px_rgba(251,191,36,0.1)]
        transition-all duration-500 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Menu header */}
        <div className="h-20 px-6 flex items-center justify-between
          border-b border-amber-100/50 dark:border-amber-800/50">
          <div className="flex items-center gap-2">
            <span className="text-lg font-serif font-bold
              bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600
              bg-clip-text text-transparent">
              Sahifat
            </span>
          </div>
          <button
            onClick={handleClick}
            className="p-2 rounded-lg 
              hover:bg-amber-50 dark:hover:bg-amber-900/30
              transition-colors duration-200"
          >
            <X className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </button>
        </div>

        {/* Menu content */}
        <div className="p-6 space-y-8">
          {/* Navigation */}
          <nav className="space-y-2">
            {links.map(({ href, label, icon: Icon, color }) => (
              <NavLink
                key={href}
                to={href}
                onClick={handleClick}
                className={({ isActive }) => `
                  group flex items-center gap-3 p-3 rounded-xl
                  font-serif text-base
                  transition-all duration-300
                  hover:translate-x-2
                  ${isActive
                    ? `bg-gradient-to-r ${color} text-white`
                    : 'hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-900 dark:text-amber-100'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 transition-transform duration-300
                      group-hover:scale-110 ${isActive ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Auth section */}
          <div className="space-y-4">
            {/* Decorative separator */}
            <div className="relative h-px bg-gradient-to-r from-amber-200 to-amber-400 dark:from-amber-700 dark:to-amber-500">
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full 
                bg-amber-400 dark:bg-amber-500" />
            </div>

            {/* Auth buttons */}
            <Link
              to="/auth/login"
              className="flex items-center gap-3 w-full p-3 
                rounded-xl font-serif
                text-amber-800 dark:text-amber-200
                hover:bg-amber-50 dark:hover:bg-amber-900/20
                transition-all duration-300
                hover:translate-x-2"
            >
              <LogIn className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Login
            </Link>

            <Link
              to="/auth/register"
              className="flex items-center justify-center gap-3 w-full p-3 
                rounded-xl font-serif text-white
                bg-gradient-to-r from-amber-600 to-amber-800
                hover:shadow-lg hover:shadow-amber-600/20
                transition-all duration-300
                hover:translate-x-2
                relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <UserPlus className="w-5 h-5" />
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};