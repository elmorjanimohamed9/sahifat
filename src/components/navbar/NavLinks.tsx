import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Mail, BookMarked } from 'lucide-react';

const links = [
  { 
    href: '/', 
    label: 'Home',
    icon: Home,
    description: 'Home'
  },
  { 
    href: '/books', 
    label: 'Books',
    icon: BookOpen,
    description: 'Explore our collection'
  },
  { 
    href: '/about', 
    label: 'About',
    icon: Users,
    description: 'Our story'
  },
  { 
    href: '/contact', 
    label: 'Contact',
    icon: Mail,
    description: 'Contact us'
  },
];

export const NavLinks = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        const isActive = location.pathname === link.href;
        const Icon = link.icon;
        
        return (
          <NavLink
            key={link.label}
            to={link.href}
            className={`
              relative group px-3 py-2
              font-serif text-base
              transition-all duration-300 ease-out
              hover:-translate-y-0.5
            `}>

            {/* Container of the link */}
            <div className="flex items-center gap-2">
              {/* Icon */}
              <Icon className={`w-4 h-4 transition-colors duration-300
                ${isActive 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-amber-600 dark:text-amber-200'
                }
                group-hover:text-amber-600 dark:group-hover:text-amber-400`} 
              />

              {/* Text */}
              <span className={`relative transition-colors duration-300
                ${isActive 
                  ? 'text-amber-800 dark:text-amber-300' 
                  : 'text-amber-600 dark:text-amber-200'
                }
                group-hover:text-amber-800 dark:group-hover:text-amber-300`}>
                {link.label}
              </span>
            </div>

            {/* Active indicator and hover effect */}
            <div className="absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full">
              {/* Fond de base */}
              <div className="absolute inset-0 bg-amber-200/30 dark:bg-amber-700/30 
                transform scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 ease-out" />
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 
                  dark:from-amber-500 dark:to-amber-700">
                  {/* Decorative particle */}
                  <div className="absolute -top-1 left-1/2 w-1 h-1 rounded-full 
                    bg-amber-400 dark:bg-amber-500" />
                </div>
              )}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};