import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Book,
  Bookmark,
  Library,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Feather,
  ScrollText
} from 'lucide-react';
import Logo from '../Logo';

// Effet de pages flottantes
const FloatingPages = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `floatPage ${6 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          <ScrollText className="w-6 h-6 text-amber-700" />
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t 
      bg-gradient-to-b from-amber-50 to-white
      dark:from-[#1a1412] dark:via-[#1c1614] dark:to-[#1e1815]
      text-amber-900/80 dark:text-amber-100/80
      border-amber-200/20 dark:border-amber-800/20">
  
      {/* Floating pages */}
      <FloatingPages />
  
      {/* Decorative effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.08),transparent_70%)]
        dark:bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.03),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(217,119,6,0.08),transparent_70%)]
        dark:bg-[radial-gradient(circle_at_70%_70%,rgba(217,119,6,0.03),transparent_70%)]" />
  
      <div className="container mx-auto px-8 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <Logo withQuote={true} withTagline={true} />
  
          {/* Navigation */}
          <div>
            <h3 className="text-amber-800 dark:text-amber-200 font-serif font-semibold mb-6 
              relative inline-flex items-center gap-2 group">
              Explorer
              <span className="w-12 h-px bg-gradient-to-r from-amber-400 to-amber-600 
                dark:from-amber-600 dark:to-amber-800
                group-hover:w-20 transition-all duration-300" />
            </h3>
            <ul className="space-y-3">
              {[
                { icon: Library, label: 'My Library' },
                { icon: Bookmark, label: 'Collections' },
                { icon: Feather, label: 'Notes' },
                { icon: Book, label: 'Discover' }
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <NavLink to={`/${label.toLowerCase()}`}
                    className="group flex items-center gap-3 text-sm 
                      text-amber-700 hover:text-amber-900
                      dark:text-amber-200/70 dark:hover:text-amber-200 
                      transition-colors duration-300">
                    <span className="p-2 rounded-lg 
                      bg-amber-100/80 dark:bg-amber-900/20 
                      group-hover:bg-amber-200/80 dark:group-hover:bg-amber-900/40 
                      transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="text-amber-800 dark:text-amber-200 font-serif font-semibold mb-6 
              relative inline-flex items-center gap-2 group">
              Contact
              <span className="w-12 h-px bg-gradient-to-r from-amber-400 to-amber-600 
                dark:from-amber-600 dark:to-amber-800
                group-hover:w-20 transition-all duration-300" />
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: '15 Book Street, Paris' },
                { icon: Mail, text: 'contact@sahifa.com' },
                { icon: Phone, text: '+33 1 23 45 67 89' }
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="group">
                  <div className="flex items-center gap-3 text-sm p-3 rounded-xl
                    bg-gradient-to-r from-amber-100 to-amber-50/50
                    dark:from-amber-900/10 dark:to-amber-800/10
                    hover:from-amber-200/50 hover:to-amber-100/50
                    dark:hover:from-amber-900/20 dark:hover:to-amber-800/20
                    border border-amber-200/50 hover:border-amber-300/50
                    dark:border-amber-900/20 dark:hover:border-amber-700/30
                    transition-all duration-300">
                    <Icon className="w-4 h-4 text-amber-700 dark:text-amber-600" />
                    <span className="text-amber-700 
                      dark:text-amber-200/70 dark:group-hover:text-amber-200 
                      transition-colors duration-300">{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Social Networks */}
          <div>
            <h3 className="text-amber-800 dark:text-amber-200 font-serif font-semibold mb-6 
              relative inline-flex items-center gap-2 group">
              Suivez-nous
              <span className="w-12 h-px bg-gradient-to-r from-amber-400 to-amber-600 
                dark:from-amber-600 dark:to-amber-800
                group-hover:w-20 transition-all duration-300" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
            {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={`https://${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl
                     bg-gradient-to-r from-amber-100 to-amber-50/50
                    dark:from-amber-900/10 dark:to-amber-800/10
                    hover:from-amber-200/50 hover:to-amber-100/50
                    dark:hover:from-amber-900/20 dark:hover:to-amber-800/20
                    border border-amber-200/50 hover:border-amber-300/50
                    dark:border-amber-900/20 dark:hover:border-amber-700/30
                    transition-all duration-300"
                >
                <Icon className="w-4 h-4 text-amber-600 transition-colors duration-300" />
              <span className="text-amber-700 dark:text-amber-200 
                    dark:text-amber-200/70 dark:group-hover:text-amber-200 ">
                {label}
              </span>
            </a>
          ))}
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-amber-200/30 dark:border-amber-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 
            text-sm text-amber-700 dark:text-amber-200">
            <p className="hover:text-amber-900 dark:hover:text-amber-200 
              transition-colors duration-300">
              &copy; {new Date().getFullYear()} Sahifa. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-amber-900 dark:hover:text-amber-200 
                transition-colors duration-300">
                Legal Notice
              </a>
              <span className="text-amber-400 dark:text-amber-800">•</span>
              <a href="#" className="hover:text-amber-900 dark:hover:text-amber-200 
                transition-colors duration-300">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;