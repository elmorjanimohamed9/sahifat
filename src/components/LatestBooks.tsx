import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, Star, Clock, Calendar,
    ArrowRight, BookMarked, Heart, Share2,
    ChevronLeft, ChevronRight
} from 'lucide-react';

interface Book {
    id: string;
    title: string;
    author: string;
    publishedDate: string;
    rating: number;
    imageUrl: string;
    description: string;
    category: string;
    pages: number;
    language: string;
    isbn: string;
    price: number;
    available: boolean;
}

const latestBooks: Book[] = [
    {
        id: "1",
        title: "The Future of AI",
        author: "Sarah Johnson",
        publishedDate: "March 2024",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        description: "Explore the revolutionary impact of artificial intelligence on our future society and how it will transform the way we live and work.",
        category: "Technology",
        pages: 384,
        language: "English",
        isbn: "978-1234567890",
        price: 29.99,
        available: true
    },
    {
        id: "2",
        title: "Digital Innovation",
        author: "Michael Chen",
        publishedDate: "March 2024",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
        description: "A comprehensive guide to digital transformation in modern business and how to stay ahead in the rapidly evolving digital landscape.",
        category: "Business",
        pages: 412,
        language: "English",
        isbn: "978-0987654321",
        price: 34.99,
        available: true
    },
    {
        id: "3",
        title: "Sustainable Future",
        author: "Emma Davis",
        publishedDate: "February 2024",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        description: "Discover how we can build a more sustainable world through innovative technologies and conscious environmental practices.",
        category: "Environment",
        pages: 356,
        language: "English",
        isbn: "978-5678901234",
        price: 27.99,
        available: true
    },
    {
        id: "4",
        title: "The Art of Design",
        author: "Alex Turner",
        publishedDate: "February 2024",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        description: "Master the principles of modern design thinking and unleash your creative potential in the digital age.",
        category: "Design",
        pages: 328,
        language: "English",
        isbn: "978-4567890123",
        price: 32.99,
        available: false
    },
    {
        id: "5",
        title: "Data Science Essentials",
        author: "David Wilson",
        publishedDate: "February 2024",
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1555066935-d69dac995864",
        description: "A practical guide to understanding and implementing modern data science techniques and machine learning algorithms.",
        category: "Technology",
        pages: 442,
        language: "English",
        isbn: "978-3456789012",
        price: 39.99,
        available: true
    },
    {
        id: "6",
        title: "UX Design Principles",
        author: "Lisa Anderson",
        publishedDate: "January 2024",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1555066936-d69dac996864",
        description: "Learn the fundamental principles of user experience design and create intuitive, user-centered digital products.",
        category: "Design",
        pages: 298,
        language: "English",
        isbn: "978-2345678901",
        price: 28.99,
        available: true
    },
    {
        id: "7",
        title: "Blockchain Revolution",
        author: "James Miller",
        publishedDate: "January 2024",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1555066937-d69dac997864",
        description: "Understanding the transformative power of blockchain technology and its impact on various industries.",
        category: "Technology",
        pages: 376,
        language: "English",
        isbn: "978-1234567891",
        price: 31.99,
        available: true
    },
    {
        id: "8",
        title: "Cloud Architecture",
        author: "Rachel Brown",
        publishedDate: "January 2024",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1555066938-d69dac998864",
        description: "A comprehensive guide to modern cloud architecture and best practices for scalable, secure applications.",
        category: "Technology",
        pages: 418,
        language: "English",
        isbn: "978-0987654322",
        price: 36.99,
        available: true
    }
];


const LatestBooks = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const booksPerPage = 4;
    const totalPages = Math.ceil(latestBooks.length / booksPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const visibleBooks = latestBooks.slice(
        currentPage * booksPerPage,
        (currentPage + 1) * booksPerPage
    );

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
                        className="flex flex-col items-center">
                        <span className="px-4 py-2 rounded-full text-sm
                            bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50
                            backdrop-blur-xl">
                            <Clock size={16} />
                            Latest Additions
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-4
                            bg-gradient-to-r from-amber-900 to-amber-700
                            dark:from-amber-200 dark:to-amber-400
                            bg-clip-text text-transparent">
                            Fresh Off The Press
                        </h2>
                        <p className="text-lg text-amber-700/70 dark:text-amber-300/70 max-w-2xl">
                            Discover our newest additions to expand your knowledge and imagination
                        </p>
                    </motion.div>
                </div>

                {/* Books Slider */}
                <div className="relative px-12">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevPage}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                            w-10 h-10 flex items-center justify-center
                            bg-white/90 dark:bg-amber-700 rounded-full
                            text-amber-900 dark:text-amber-100
                            hover:bg-amber-500 hover:text-white
                            transition-all duration-300 shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextPage}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                            w-10 h-10 flex items-center justify-center
                            bg-white/90 dark:bg-amber-700 rounded-full
                            text-amber-900 dark:text-amber-100
                            hover:bg-amber-500 hover:text-white
                            transition-all duration-300 shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === totalPages - 1}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Books Grid */}
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial={false}
                            animate={{ x: `${-currentPage * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                            {visibleBooks.map((book, index) => (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="group relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20 rounded-2xl
                                        overflow-hidden transition-all duration-300
                                        border border-amber-200/50 dark:border-amber-800/50">
                                        
                                        {/* Book Cover */}
                                        <div className="relative h-[150px] overflow-hidden">
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

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium
                                                    bg-white/90 dark:bg-amber-700
                                                    text-amber-900 dark:text-amber-100
                                                    flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {book.publishedDate}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Book Info */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-bold
                                                    text-amber-900 dark:text-amber-100">
                                                    {book.title}
                                                </h3>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                        {book.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-amber-700/70 dark:text-amber-300/70 mb-4">
                                                by {book.author}
                                            </p>

                                            <p className="text-sm text-amber-700/70 dark:text-amber-300/70 mb-6 line-clamp-2">
                                                {book.description}
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
                                                <span>Read More</span>
                                                <ArrowRight size={16} 
                                                    className="transition-transform duration-300
                                                        group-hover/btn:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300
                                    ${i === currentPage 
                                        ? 'bg-amber-600 w-6' 
                                        : 'bg-amber-300 hover:bg-amber-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestBooks;