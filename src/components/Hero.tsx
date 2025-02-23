import { BookOpen, Users, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">

      <div className="container mx-auto px-6 py-10 lg:py-0 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6
              bg-gradient-to-r from-amber-900 to-amber-700
              dark:from-amber-200 dark:to-amber-400
              bg-clip-text text-transparent"
          >
            Discover a world of infinite knowledge
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-14 text-amber-800/70 dark:text-amber-200/70"
          >
            Explore our vast collection of digital books and embark on a unique literary journey
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/books" 
              className="group flex items-center gap-2 px-8 py-4 rounded-xl
                bg-gradient-to-r from-amber-600 to-amber-800
                hover:from-amber-700 hover:to-amber-900
                text-white font-medium
                transform hover:translate-y-[-2px]
                transition-all duration-300
                shadow-lg shadow-amber-900/20 hover:shadow-xl hover:shadow-amber-900/30">
              Explore the collection
              <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about"
              className="group px-8 py-4 rounded-xl
                bg-gradient-to-r from-amber-100 to-amber-50/50
                dark:from-amber-900/10 dark:to-amber-800/10
                hover:bg-white dark:hover:bg-amber-900/10
                border border-amber-200/50 dark:border-amber-800/50
                text-amber-900 dark:text-amber-100
                font-medium
                transform hover:translate-y-[-2px]
                transition-all duration-300
                backdrop-blur-sm">
              Learn More
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: BookOpen, title: "10K+ Books", desc: "A diverse collection" },
              { icon: Users, title: "Active Community", desc: "Share your discoveries" },
              { icon: Sparkles, title: "Unique Experience", desc: "Intuitive navigation" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl
                bg-gradient-to-r from-amber-100 to-amber-50/50
                dark:from-amber-900/10 dark:to-amber-800/10
                border border-amber-200/50 dark:border-amber-800/50
                hover:border-amber-400/50 dark:hover:border-amber-600/50
                transform hover:translate-y-[-2px]
                transition-all duration-300
                backdrop-blur-sm">
                <div className="mb-4 p-3 rounded-xl inline-block bg-amber-200 dark:bg-amber-900/20">
                  <Icon className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2
                  text-amber-900 dark:text-amber-200">
                  {title}
                </h3>
                <p className="text-amber-700/70 dark:text-amber-300/70">
                  {desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};