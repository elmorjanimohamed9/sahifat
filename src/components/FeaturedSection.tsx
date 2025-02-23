import React from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Sparkles, Star,
    ArrowRight, BookMarked
} from 'lucide-react';

const FeaturedSection = () => {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white 
                dark:from-[#1a1412] dark:to-[#1e1815]">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-20" 
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.1) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }} 
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Featured Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 
                            rounded-full bg-amber-100 dark:bg-amber-900/40
                            text-amber-800 dark:text-amber-200 text-sm">
                            <Sparkles size={16} className="animate-pulse" />
                            <span>Discover Amazing Books</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold leading-tight
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Your Gateway to
                            <span className="block">Literary Adventures</span>
                        </h2>

                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-xl">
                            Embark on a journey through countless stories, knowledge, and 
                            adventures. Find your next favorite book in our carefully 
                            curated collection.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-xl
                                    bg-gradient-to-r from-amber-600 to-amber-800
                                    hover:from-amber-700 hover:to-amber-900
                                    text-white font-medium
                                    transition-all duration-300
                                    shadow-lg shadow-amber-900/20 hover:shadow-xl
                                    flex items-center gap-2"
                            >
                                <BookOpen size={20} />
                                <span>Start Reading</span>
                                <ArrowRight size={16} className="transition-transform duration-300
                                    group-hover:translate-x-1" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-xl
                                    bg-white dark:bg-gray-900
                                    text-amber-900 dark:text-amber-100
                                    border border-amber-200 dark:border-amber-800
                                    hover:bg-amber-50 dark:hover:bg-amber-900/50
                                    font-medium shadow-lg
                                    flex items-center gap-2"
                            >
                                <BookMarked size={20} />
                                <span>Browse Collection</span>
                            </motion.button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-8 border-t border-amber-200/50 dark:border-amber-800/50">
                            {[
                                { value: "10K+", label: "Books" },
                                { value: "5K+", label: "Readers" },
                                { value: "4.9", label: "Rating" }
                            ].map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-2xl font-bold
                                        text-amber-900 dark:text-amber-100">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-amber-700/70 dark:text-amber-300/70">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative Circle */}
                        <div className="absolute inset-0 bg-gradient-to-br
                            from-amber-500/20 to-amber-600/20 rounded-full
                            blur-3xl transform -rotate-12" />

                        {/* Featured Image Grid */}
                        <div className="relative grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ y: -5 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br
                                        from-amber-500/20 to-amber-600/20
                                        rounded-2xl blur-md opacity-0 group-hover:opacity-100
                                        transition-opacity duration-300" />
                                    
                                    <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                                        rounded-2xl overflow-hidden shadow-lg
                                        aspect-[3/4] p-4
                                        border border-amber-200/50 dark:border-amber-800/50">
                                        <img
                                            src={`https://source.unsplash.com/random/600x800?book&${item}`}
                                            alt="Book Cover"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Elements */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="absolute"
                                style={{
                                    top: `${20 + i * 30}%`,
                                    left: `${10 + i * 40}%`,
                                    zIndex: 10
                                }}
                            >
                                <Star className="w-6 h-6 text-amber-500 fill-amber-500/50" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;