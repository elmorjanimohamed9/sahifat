import React from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Calendar, QrCode,
    CheckCircle, XCircle, ArrowRight,
    BookMarked, Heart, Share2
} from 'lucide-react';

interface Book {
    title: string;
    author: string;
    isbn: string;
    categoryId: string;
    description?: string;
    publishedYear?: number;
    imageUrl?: string;
    available: boolean;
}

// Mock des 4 derniers livres ajoutés
const recentBooks: Book[] = [
    {
        title: "Modern Web Development",
        author: "Sarah Johnson",
        isbn: "978-1234567890",
        categoryId: "Programming",
        description: "A comprehensive guide to modern web technologies",
        publishedYear: 2024,
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        available: true,
    },
    {
        title: "AI & Machine Learning",
        author: "Michael Chen",
        isbn: "978-0987654321",
        categoryId: "Technology",
        description: "Exploring artificial intelligence fundamentals",
        publishedYear: 2024,
        imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
        available: false,
    },
    {
        title: "Cloud Architecture",
        author: "Emma Davis",
        isbn: "978-5678901234",
        categoryId: "Technology",
        description: "Understanding modern cloud infrastructure",
        publishedYear: 2024,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        available: true,
    },
    {
        title: "Cybersecurity Basics",
        author: "Alex Turner",
        isbn: "978-4567890123",
        categoryId: "Security",
        description: "Essential knowledge for digital security",
        publishedYear: 2024,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        available: true,
    }
];

const FeaturedBooks = () => {
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
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Recently Added Books
                        </h2>
                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl mx-auto">
                            Discover our latest additions to the library collection
                        </p>
                    </motion.div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recentBooks.map((book, index) => (
                        <motion.div
                            key={book.isbn}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="group relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 rounded-2xl
                                overflow-hidden border border-amber-200/50 dark:border-amber-800/50">
                                
                                {/* Book Cover */}
                                <div className="relative h-[250px] overflow-hidden">
                                    <img 
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-300
                                            group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    
                                    {/* Quick Actions */}
                                    <div className="absolute top-4 right-4 space-y-2 space-x-1 opacity-0 group-hover:opacity-100
                                        transform translate-x-4 group-hover:translate-x-0
                                        transition-all duration-300">
                                        {[Heart, BookMarked, Share2].map((Icon, i) => (
                                            <button key={i}
                                                className="p-2 rounded-full bg-white/90 dark:bg-amber-700
                                                    hover:bg-amber-500 dark:hover:bg-amber-600
                                                    text-amber-900 dark:text-amber-100
                                                    hover:text-white dark:hover:text-white
                                                    transition-colors duration-300
                                                    shadow-lg"
                                            >
                                                <Icon size={18} />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Availability Badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            flex items-center gap-1
                                            ${book.available
                                                ? 'bg-green-500/90 text-white'
                                                : 'bg-red-500/90 text-white'}`}>
                                            {book.available ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {book.available ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                </div>

                                {/* Book Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 
                                        text-amber-900 dark:text-amber-100
                                        line-clamp-1">
                                        {book.title}
                                    </h3>
                                    <p className="text-amber-700/70 dark:text-amber-300/70 mb-4
                                        line-clamp-1">
                                        by {book.author}
                                    </p>

                                    {/* Action Button */}
                                    <button className="w-full py-3 px-4 rounded-xl
                                        bg-gradient-to-r from-amber-600 to-amber-800
                                        hover:from-amber-700 hover:to-amber-900
                                        text-white font-medium
                                        transition-all duration-300
                                        shadow-lg shadow-amber-900/20
                                        flex items-center justify-center gap-2
                                        group/btn">
                                        <BookOpen size={18} />
                                        <span>View Details</span>
                                        <ArrowRight size={16} 
                                            className="transition-transform duration-300
                                                group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
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
                            flex items-center gap-2 mx-auto">
                        <span>Explore All Books</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300
                            group-hover:translate-x-1" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBooks;