import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen, Heart, Share2, BookMarked,
    Calendar, MessageCircle, CheckCircle,
    XCircle, ArrowLeft, BookCopy, Star
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const relatedBooks = [
    {
        id: "2",
        title: "Clean Code",
        author: "Robert C. Martin",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
        rating: 4.8,
        available: true,
    },
    {
        id: "3",
        title: "Design Patterns",
        author: "Erich Gamma",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
        rating: 4.6,
        available: true,
    },
    {
        id: "4",
        title: "Pragmatic Programmer",
        author: "Andy Hunt",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
        rating: 4.7,
        available: false,
    },
];

const mockBook = {
    title: "The Art of Programming",
    author: "John Smith",
    isbn: "978-3-16-148410-0",
    categoryId: "Computer Science",
    description: "A comprehensive guide to modern programming practices, covering everything from basic algorithms to advanced software architecture. Perfect for both beginners and experienced developers looking to deepen their understanding.",
    publishedYear: 2023,
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    available: true,
    rating: 4.5,
    pages: 450,
    language: "English",
};

const BookDetails: React.FC = () => {
    const { id } = useParams();
    const [book] = useState(mockBook);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="bg-amber-50 dark:bg-amber-950/10">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <Link
                    to="/books"
                    className="group inline-flex items-center gap-2 px-4 py-2 
                    rounded-xl bg-white/50 dark:bg-amber-900/20
                    border border-amber-200/50 dark:border-amber-800/50
                    text-amber-800 dark:text-amber-200
                    hover:bg-amber-100 dark:hover:bg-amber-800/40
                    transition-all duration-300">
                    <ArrowLeft
                        size={20}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    <span className="font-medium font-serif">Back to Books</span>
                </Link>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group md:sticky md:top-8"
                    >
                        {/* Book Cover Container */}
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden
                        bg-gradient-to-br from-amber-100 to-amber-50
                        dark:from-amber-900/40 dark:to-amber-800/40
                        border border-amber-200/50 dark:border-amber-800/50
                        shadow-xl shadow-amber-900/10">

                            {/* Book Cover Image */}
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            {/* Quick Actions */}
                            <div className="absolute top-4 right-4 space-y-2 space-x-1">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-2.5 rounded-full transition-colors duration-300 shadow-lg
                                    ${isFavorite
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/90 dark:bg-amber-800/90 text-amber-900 dark:text-amber-100'}`}>
                                    <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                                </motion.button>
                                {[BookMarked, Share2].map((Icon, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2.5 rounded-full bg-white/90 dark:bg-amber-800/90
                                            hover:bg-amber-500 dark:hover:bg-amber-700
                                            text-amber-900 dark:text-amber-100
                                            hover:text-white
                                            transition-colors duration-300
                                            shadow-lg">
                                        <Icon size={18} />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Availability Badge */}
                            <div className="absolute bottom-4 left-4">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${book.available
                                    ? 'bg-green-500/90 text-white'
                                    : 'bg-red-500/90 text-white'}`}>
                                    {book.available
                                        ? <CheckCircle size={16} />
                                        : <XCircle size={16} />}
                                    {book.available ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Book Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 min-h-full flex flex-col"
                    >
                        {/* Content Wrapper */}
                        <div className="flex-1 space-y-8">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 font-serif 
                                rounded-full bg-amber-100 dark:bg-amber-900/40
                                text-amber-800 dark:text-amber-200 text-sm
                                border border-amber-200/50 dark:border-amber-800/50">
                                <BookOpen size={16} />
                                {book.categoryId}
                            </div>

                            {/* Title & Author */}
                            <div>
                                <h1 className="text-4xl font-bold mb-4 font-serif
                                    bg-gradient-to-r from-amber-900 to-amber-700
                                    dark:from-amber-200 dark:to-amber-400
                                    bg-clip-text text-transparent">
                                    {book.title}
                                </h1>
                                <p className="text-xl text-amber-700/70 dark:text-amber-300/70 font-serif">
                                    by {book.author}
                                </p>
                            </div>

                            {/* Book Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-white dark:bg-amber-900/20
                        border border-amber-200/50 dark:border-amber-800/50">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-500 fill-current" />
                                        <div>
                                            <div className="font-bold text-amber-900 dark:text-amber-100">
                                                {book.rating}
                                            </div>
                                            <div className="text-xs text-amber-600/70 dark:text-amber-400/70 font-serif">
                                                Rating
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        <div>
                                            <div className="font-bold text-amber-900 dark:text-amber-100">
                                                {book.pages}
                                            </div>
                                            <div className="text-xs font-serif text-amber-600/70 dark:text-amber-400/70">
                                                Pages
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50">
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        <div>
                                            <div className="font-bold text-amber-900 font-serif dark:text-amber-100">
                                                {book.language}
                                            </div>
                                            <div className="text-xs font-serif text-amber-600/70 dark:text-amber-400/70">
                                                Language
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Book Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Calendar, label: 'Published', value: book.publishedYear },
                                    { icon: BookOpen, label: 'ISBN', value: book.isbn }
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label}
                                        className="p-4 rounded-xl
                                bg-white dark:bg-amber-900/20
                                border border-amber-200/50 dark:border-amber-800/50">
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            <div>
                                                <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                                                    {label}
                                                </p>
                                                <p className="font-medium text-amber-900 dark:text-amber-100">
                                                    {value || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            {book.description && (
                                <div className="prose prose-amber dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                                        About this book
                                    </h3>
                                    <p className="text-amber-700/70 dark:text-amber-300/70">
                                        {book.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-8 border-t border-amber-200/50 dark:border-amber-800/50">
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-4 px-6 rounded-xl
                            bg-gradient-to-r from-amber-600 to-amber-800
                            hover:from-amber-700 hover:to-amber-900
                            text-white font-medium
                            shadow-lg shadow-amber-900/20
                            flex items-center justify-center gap-2
                            transition-all duration-300"
                                    disabled={!book.available}
                                >
                                    <BookOpen size={20} />
                                    <span>Read Now</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 py-4 px-6 rounded-xl
                            font-medium flex items-center justify-center gap-2
                            transition-all duration-300 shadow-lg
                            ${book.available
                                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-900/20'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}
                                    disabled={!book.available}
                                >
                                    <BookCopy size={20} />
                                    <span>{book.available ? 'Borrow Now' : 'Not Available'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Related Books Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 border-t border-amber-200/50 dark:border-amber-800/50">
                <div className="space-y-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold font-serif
                        bg-gradient-to-r from-amber-900 to-amber-700
                        dark:from-amber-200 dark:to-amber-400
                        bg-clip-text text-transparent">
                            Related Books
                        </h2>
                        <Link
                            to="/books"
                            className="inline-flex items-center font-serif gap-2 px-4 py-2
                            rounded-xl bg-white/50 dark:bg-amber-900/20
                            border border-amber-200/50 dark:border-amber-800/50
                            text-amber-800 dark:text-amber-200
                            hover:bg-amber-100 dark:hover:bg-amber-800/40
                            transition-all duration-300"
                        >
                            View All
                            <ArrowLeft size={16} className="rotate-180" />
                        </Link>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {relatedBooks.map((book, index) => (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative">
                                        
                                    <Link to={`/book/${book.id}`}>
                                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden
                                        bg-white dark:bg-amber-900/20
                                        border border-amber-200/50 dark:border-amber-800/50
                                        shadow-lg shadow-amber-900/10">
                                            {/* Book Cover */}
                                            <img
                                                src={book.imageUrl}
                                                alt={book.title}
                                                className="w-full h-full object-cover 
                                                transition-transform duration-500 
                                                group-hover:scale-105"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t 
                                            from-black/60 to-transparent opacity-0 
                                            group-hover:opacity-100 transition-opacity
                                            duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-amber-500 font-serif font-bold truncate">
                                                        {book.title}
                                                    </h3>
                                                    <p className="text-white/80 font-serif font-medium text-sm truncate">
                                                        {book.author}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Rating Badge */}
                                            <div className="absolute top-2 right-2">
                                                <div className="flex items-center gap-1 px-2 py-1
                                                rounded-full bg-white/90 dark:bg-amber-900/90
                                                text-amber-900 dark:text-amber-100 text-sm">
                                                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                        {book.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Availability Badge */}
                                            <div className="absolute top-2 left-2">
                                                <div className={`px-2 py-1 rounded-full text-xs
                                                ${book.available
                                                        ? 'bg-green-500/90 text-white'
                                                        : 'bg-red-500/90 text-white'}`}>
                                                    {book.available ? 'Available' : 'Not Available'}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;