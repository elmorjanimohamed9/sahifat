import React from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, ArrowRight, BookMarked,
    Sparkles, Star, TrendingUp
} from 'lucide-react';

interface Category {
    name: string;
    description: string;
}

const categories: Category[] = [
    {
        name: "Fiction & Literature",
        description: "Explore imaginative worlds and compelling stories"
    },
    {
        name: "Science & Technology",
        description: "Discover the latest in scientific advancement"
    },
    {
        name: "Business & Finance",
        description: "Master the art of business and financial success"
    },
    {
        name: "Arts & Design",
        description: "Unleash your creativity and artistic potential"
    },
    {
        name: "History & Culture",
        description: "Journey through time and human civilization"
    },
    {
        name: "Personal Development",
        description: "Transform your life and reach your goals"
    }
];

const BookCategories = () => {
    return (
        <section className="py-20 px-4 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <span className="px-4 py-2 rounded-full text-sm
                            bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50
                            backdrop-blur-xl">
                            <BookMarked size={16} />
                            Explore Categories
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-4
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Find Your Perfect Read
                        </h2>
                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl">
                            Discover our diverse collection of books across various categories
                        </p>
                    </motion.div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="group relative p-8 rounded-2xl
                               bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20
                                border border-amber-200/50 dark:border-amber-800/50
                                hover:border-amber-300 dark:hover:border-amber-700
                                transition-all duration-300
                                hover:shadow-xl hover:shadow-amber-900/10
                                hover:-translate-y-1">
                                
                                {/* Decorative Elements */}
                                <div className="absolute top-4 right-4 opacity-30
                                    group-hover:opacity-100 transition-opacity duration-300">
                                    <Star className="w-6 h-6 text-amber-500" />
                                </div>

                                {/* Category Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3
                                        bg-gradient-to-r from-amber-900 to-amber-700
                                        dark:from-amber-200 dark:to-amber-400
                                        bg-clip-text text-transparent
                                        group-hover:from-amber-700 group-hover:to-amber-500
                                        dark:group-hover:from-amber-300 dark:group-hover:to-amber-500">
                                        {category.name}
                                    </h3>
                                    
                                    <p className="text-amber-700/70 dark:text-amber-300/70 mb-6">
                                        {category.description}
                                    </p>

                                    {/* Action Link */}
                                    <div className="flex items-center gap-2
                                        text-amber-600 dark:text-amber-400
                                        group-hover:text-amber-800 dark:group-hover:text-amber-200
                                        transition-colors duration-300">
                                        <span className="font-medium">Explore Category</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300
                                            group-hover:translate-x-1" />
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-2xl
                                    bg-gradient-to-br from-amber-50/0 to-amber-100/0
                                    dark:from-amber-900/0 dark:to-amber-800/0
                                    group-hover:from-amber-50/50 group-hover:to-amber-100/50
                                    dark:group-hover:from-amber-900/10 dark:group-hover:to-amber-800/10
                                    transition-all duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-xl
                            bg-gradient-to-r from-amber-600 to-amber-800
                            hover:from-amber-700 hover:to-amber-900
                            text-white font-medium
                            transition-all duration-300
                            shadow-lg shadow-amber-900/20 hover:shadow-xl
                            flex items-center gap-2 mx-auto"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300
                            group-hover:translate-x-1" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default BookCategories;