import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, BookOpen, Calendar,
    CheckCircle, XCircle, ArrowUpDown,
    Bookmark, Heart, Share2, Grid, List,
    ChevronRight, ArrowRight
} from 'lucide-react';

// Types
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

interface CategoryFilter {
    id: string;
    name: string;
    color: string;
}

const CATEGORIES: CategoryFilter[] = [
    { id: 'all', name: 'All Books', color: 'from-amber-400 to-amber-600' },
    { id: 'Programming', name: 'Programming', color: 'from-amber-500 to-orange-600' },
    { id: 'Technology', name: 'Technology', color: 'from-orange-400 to-amber-600' },
    { id: 'Science', name: 'Science', color: 'from-yellow-400 to-amber-500' },
    { id: 'Business', name: 'Business', color: 'from-amber-300 to-amber-500' }
];

const SORT_OPTIONS = [
    { id: 'title', name: 'Title' },
    { id: 'author', name: 'Author' },
    { id: 'year', name: 'Year' },
    { id: 'available', name: 'Availability' }
];

// Animation variants
const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    }
};

// Mock Books Data
const MOCK_BOOKS: Book[] = [
    {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        isbn: "978-0465050659",
        categoryId: "Technology",
        description: "A powerful primer on how—and why—some products satisfy customers while others only frustrate them.",
        publishedYear: 2013,
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop",
        available: true
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        categoryId: "Programming",
        description: "A handbook of agile software craftsmanship that helps programmers write better code.",
        publishedYear: 2008,
        imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1789&auto=format&fit=crop",
        available: true
    },
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        isbn: "978-0553380163",
        categoryId: "Science",
        description: "Explores fundamental questions about the universe and our existence.",
        publishedYear: 1988,
        imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1827&auto=format&fit=crop",
        available: false
    },
    {
        title: "Zero to One",
        author: "Peter Thiel",
        isbn: "978-0804139298",
        categoryId: "Business",
        description: "Notes on startups, or how to build the future.",
        publishedYear: 2014,
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1812&auto=format&fit=crop",
        available: true
    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        isbn: "978-0201616224",
        categoryId: "Programming",
        description: "From journeyman to master - a guide to software development practices.",
        publishedYear: 1999,
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1770&auto=format&fit=crop",
        available: true
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        isbn: "978-0062316097",
        categoryId: "Science",
        description: "A brief history of humankind exploring the evolution of our species.",
        publishedYear: 2014,
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1773&auto=format&fit=crop",
        available: true
    },
    {
        title: "Deep Learning",
        author: "Ian Goodfellow",
        isbn: "978-0262035613",
        categoryId: "Technology",
        description: "Comprehensive guide to deep learning fundamentals and practices.",
        publishedYear: 2016,
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1770&auto=format&fit=crop",
        available: false
    },
    {
        title: "Good to Great",
        author: "Jim Collins",
        isbn: "978-0066620992",
        categoryId: "Business",
        description: "Why some companies make the leap and others don't.",
        publishedYear: 2001,
        imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1776&auto=format&fit=crop",
        available: true
    },
    {
        title: "The Art of Computer Programming",
        author: "Donald Knuth",
        isbn: "978-0201896831",
        categoryId: "Programming",
        description: "Comprehensive monograph written by computer scientist Donald Knuth.",
        publishedYear: 1968,
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1769&auto=format&fit=crop",
        available: true
    },
    {
        title: "The Innovator's Dilemma",
        author: "Clayton M. Christensen",
        isbn: "978-0062060242",
        categoryId: "Business",
        description: "When new technologies cause great firms to fail.",
        publishedYear: 1997,
        imageUrl: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1770&auto=format&fit=crop",
        available: false
    },
    {
        title: "Quantum Computing",
        author: "Michael A. Nielsen",
        isbn: "978-1107002173",
        categoryId: "Technology",
        description: "Essential overview of the quantum information science field.",
        publishedYear: 2010,
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1770&auto=format&fit=crop",
        available: true
    },
    {
        title: "Cosmos",
        author: "Carl Sagan",
        isbn: "978-0345539435",
        categoryId: "Science",
        description: "Explores the mutual development of science and civilization.",
        publishedYear: 1980,
        imageUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1778&auto=format&fit=crop",
        available: true
    }
];

// Book Card Component
interface BookCardProps {
    book: Book;
    view: 'grid' | 'list';
}

const BookCard: React.FC<BookCardProps> = ({ book, view }) => {
    return (
        <motion.div
            layout
            variants={scaleInVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`
                group relative overflow-hidden
                ${view === 'list' ? 'flex gap-6' : ''}
            `}
        >
            {view === 'grid' ? (
                <GridViewBook book={book} />
            ) : (
                <ListViewBook book={book} />
            )}
        </motion.div>
    );
};

const GridViewBook: React.FC<{ book: Book }> = ({ book }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-gradient-to-r from-amber-50 to-amber-100
         dark:from-amber-950/50 dark:to-amber-950/40 rounded-2xl
        overflow-hidden border border-amber-200/50 dark:border-amber-800/50">
        {/* Image Section */}
        <div className="relative h-[280px] overflow-hidden">
            {/* Image avec effet de zoom */}
            <img
                src={book.imageUrl || '/default-book.jpg'}
                alt={book.title}
                className="w-full h-full object-cover transform 
                    group-hover:scale-110 transition-transform duration-700"
            />

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2
                opacity-0 group-hover:opacity-100 transform translate-x-4 
                group-hover:translate-x-0 transition-all duration-300">
                {[
                    { icon: Heart, label: "Like" },
                    { icon: Bookmark, label: "Save" },
                    { icon: Share2, label: "Share" }
                ].map((item, i) => (
                    <button key={i}
                        className="p-2.5 rounded-full relative
                            bg-white/95 dark:bg-amber-700
                            hover:bg-gradient-to-r from-amber-500 to-amber-600
                            text-amber-600 dark:text-amber-100 hover:text-amber-100
                            transform hover:scale-110 transition-all duration-300"
                    >
                        <item.icon size={18} />
                        <span className="absolute font-serif left-full ml-2 px-2 py-1 rounded-md
                            bg-white/90 dark:bg-gray-800/90 text-amber-600
                            text-sm whitespace-nowrap opacity-0 
                            transform -translate-x-2 pointer-events-none
                            transition-all duration-300">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Category Badge */}
            <span className="absolute font-serif font-bold top-4 left-4 px-3 py-1 rounded-full text-xs
                bg-white/90 dark:bg-gray-900/90 text-amber-600 dark:text-amber-400
                border border-amber-200/50 dark:border-amber-800/50">
                {book.categoryId}
            </span>
        </div>

        {/* Content Section */}
        <div className="py-4 px-6 space-y-4">
            {/* Title & Author */}
            <div>
                <h3 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-100
                    line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400
                    transition-colors duration-300">
                    {book.title}
                </h3>
                <p className="text-amber-600/80 dark:text-amber-400/80 mt-1 font-serif">
                    by {book.author}
                </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center font-serif gap-1.5 text-amber-700/70 dark:text-amber-300/70">
                    <Calendar size={14} />
                    {book.publishedYear}
                </span>
                <span className={`px-3 py-1 font-serif rounded-full text-xs font-medium
                    flex items-center gap-1.5
                    ${book.available
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {book.available ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {book.available ? 'Available' : 'Not Available'}
                </span>
            </div>

            {/* Action Button */}
            <button className="w-full font-serif font-bold py-3 px-4 rounded-xl
                bg-gradient-to-r from-amber-500 to-amber-700
                hover:from-amber-600 hover:to-amber-800
                text-white shadow-lg
                transform hover:translate-y-[-2px]
                transition-all duration-300
                flex items-center justify-center gap-2">
                <BookOpen size={18} />
                <span>View Details</span>
                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 
                    transition-transform duration-300" />
            </button>
        </div>
    </motion.div>
);

const ListViewBook: React.FC<{ book: Book }> = ({ book }) => (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full bg-gradient-to-r from-amber-50 to-amber-100
         dark:from-amber-950/50 dark:to-amber-950/40
        rounded-2xl border border-amber-200/30 dark:border-amber-800/30
        hover:border-amber-300/50 dark:hover:border-amber-700/50">
        {/* Image Container with Creative Effects */}
        <div className="relative w-full md:w-[180px] h-[240px] md:h-[260px] 
            flex-shrink-0 overflow-hidden rounded-xl">
            <img
                src={book.imageUrl || '/default-book.jpg'}
                alt={book.title}
                className="w-full h-full object-cover transform 
                    group-hover:scale-110 transition-transform duration-700"
            />

            {/* Category Badge */}
            <span className="absolute font-serif top-4 left-4 z-20 px-3 py-1.5 
                rounded-full text-xs font-medium
                bg-white/90 dark:bg-gray-900/90 
                text-amber-600 dark:text-amber-400
                border border-amber-200/50 dark:border-amber-800/50
                shadow-lg backdrop-blur-sm">
                {book.categoryId}
            </span>

            {/* Quick Actions Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20
                flex justify-center gap-3
                opacity-0 group-hover:opacity-100 
                transform translate-y-4 group-hover:translate-y-0 
                transition-all duration-300">
                {[
                    { icon: Heart, label: "Like" },
                    { icon: Bookmark, label: "Save" },
                    { icon: Share2, label: "Share" }
                ].map((item, i) => (
                    <button key={i}
                        className="p-2 font-serif rounded-full
                            bg-white/95 dark:bg-amber-700
                            hover:bg-gradient-to-r from-amber-500 to-amber-600
                            text-amber-600 dark:text-amber-100
                            transform hover:scale-110 transition-all duration-300"
                        title={item.label}>
                        <item.icon size={18} />
                    </button>
                ))}
            </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Header */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-xl font-bold font-serif
                        bg-gradient-to-r from-amber-800 to-amber-600
                        dark:from-amber-200 dark:to-amber-400
                        bg-clip-text text-transparent
                        group-hover:from-amber-600 group-hover:to-amber-800
                        dark:group-hover:from-amber-400 dark:group-hover:to-amber-200
                        transition-all duration-300 line-clamp-1">
                        {book.title}
                    </h3>
                    <p className="text-amber-600/80 font-serif dark:text-amber-400/80 
                        font-medium mt-1">
                        by {book.author}
                    </p>
                </div>

                {/* Meta Information */}
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 
                        text-amber-700/70 dark:text-amber-300/70 text-sm font-serif">
                        <Calendar size={14} />
                        {book.publishedYear}
                    </span>
                    <span className={`px-3 py-1 font-serif rounded-full text-xs font-medium
                        flex items-center gap-1.5 shadow-sm
                        ${book.available
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                        {book.available ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {book.available ? 'Available' : 'Borrowed'}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm font-serif text-gray-600 dark:text-gray-400 
                    line-clamp-3 group-hover:line-clamp-none
                    transition-all duration-300">
                    {book.description}
                </p>
            </div>

            {/* Action Button */}
            <button className="mt-4 inline-flex font-serif items-center justify-center gap-2 
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-amber-500 to-amber-600
                hover:from-amber-600 hover:to-amber-700
                text-white font-bold
                transform hover:-translate-y-0.5 hover:shadow-lg
                hover:shadow-amber-500/25
                transition-all duration-300">
                View Details
                <ArrowRight size={16} className="transform group-hover:translate-x-1 
                    transition-transform duration-300" />
            </button>
        </div>
    </div>
);

const Books = () => {
    // State
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showFilters, setShowFilters] = useState(false);

    // Filtered and sorted books
    const filteredBooks = useMemo(() => {
        return MOCK_BOOKS
            .filter(book => {
                const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                    book.author.toLowerCase().includes(search.toLowerCase());
                const matchesCategory = selectedCategory === 'all' || book.categoryId === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                let comparison = 0;
                switch (sortBy) {
                    case 'title':
                        comparison = a.title.localeCompare(b.title);
                        break;
                    case 'author':
                        comparison = a.author.localeCompare(b.author);
                        break;
                    case 'year':
                        comparison = (a.publishedYear || 0) - (b.publishedYear || 0);
                        break;
                    case 'available':
                        comparison = Number(b.available) - Number(a.available);
                        break;
                }
                return sortOrder === 'asc' ? comparison : -comparison;
            });
    }, [search, selectedCategory, sortBy, sortOrder]);

    return (
        <section className="py-12 px-4 min-h-screen bg-amber-50 dark:bg-amber-950/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center relative py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}>

                    {/* Badge */}
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-6 py-2.5 font-serif rounded-full text-sm font-medium
                            bg-gradient-to-r from-amber-50 to-amber-100
                            dark:from-amber-900/40 dark:to-amber-800/40
                            text-amber-800 dark:text-amber-200
                            inline-flex items-center gap-2.5 mb-6
                            border border-amber-200/50 dark:border-amber-700/50">
                        <span className="relative">
                            <BookOpen size={18} className="relative z-10" />
                            <span className="absolute inset-0 opacity-30">
                                <BookOpen size={18} />
                            </span>
                        </span>
                        Discover Amazing Books
                    </motion.span>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <span className="text-4xl font-serif md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 dark:from-amber-200 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent leading-tight block"
                        >
                            Library Collection
                        </span>
                        {/* Decorative Underline */}
                        <span className="absolute left-1/2 -bottom-4 w-24 h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform -translate-x-1/2" />
                    </motion.h1>

                    {/* Optional Subtitle */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-lg font-serif text-amber-700/70 dark:text-amber-300/70max-w-2xl mx-auto"
                    >
                        Explore our curated collection of books across various categories
                    </motion.p>
                </motion.div>

                {/* Search and Filters Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 min-w-[240px]">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-amber-950/10 placeholder:text-amber-600 dark:placeholder:text-amber-200 border border-amber-400 dark:border-amber-700 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-2">
                            {/* View Toggle */}
                            <div className="bg-white dark:bg-amber-950/10 rounded-lg p-1 border border-amber-400 dark:border-amber-700">
                                {[
                                    { icon: Grid, value: 'grid' },
                                    { icon: List, value: 'list' }
                                ].map(({ icon: Icon, value }) => (
                                    <button
                                        key={value}
                                        onClick={() => setView(value as 'grid' | 'list')}
                                        className={`p-2 rounded-md transition-all ${view === value
                                            ? 'bg-amber-500 text-white'
                                            : 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                                            }`}
                                    >
                                        <Icon size={20} />
                                    </button>
                                ))}
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2 rounded-lg border transition-all
                            ${showFilters
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : 'bg-white dark:bg-amber-950/10 text-amber-600 border-amber-400 dark:border-amber-700'
                                    }`}>
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 p-4 bg-white dark:bg-amber-950/10 rounded-lg border border-amber-200 dark:border-amber-700">
                                {/* Categories */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-serif font-medium text-amber-800 dark:text-amber-200">
                                        Categories
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-serif transition-all
                                        ${selectedCategory === category.id
                                                        ? 'bg-amber-500 text-white'
                                                        : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Options */}
                                <div className="mt-4 flex items-center gap-3">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-1.5 rounded-lg text-sm font-serif bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 focus:ring-1 focus:ring-amber-500 outline-none"
                                    >
                                        {SORT_OPTIONS.map(option => (
                                            <option key={option.id} value={option.id}>
                                                Sort by {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                        className="p-1.5 rounded-lg font-serif
                            bg-amber-50 dark:bg-amber-900/30
                            text-amber-700 dark:text-amber-300
                            hover:bg-amber-100 dark:hover:bg-amber-800/50"
                                    >
                                        <ArrowUpDown size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Books grid */}
                <div className={`grid gap-6 ${view === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 lg:grid-cols-2'
                    }`}>
                    <AnimatePresence>
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.isbn}
                                book={book}
                                view={view}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filteredBooks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="inline-block p-4 rounded-full
                            bg-amber-50 dark:bg-amber-900/20 mb-4">
                            <BookOpen size={48} className="text-amber-500" />
                        </div>
                        <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300">
                            No books found
                        </h3>
                        <p className="text-amber-600/70 dark:text-amber-400/70">
                            Try adjusting your search or filters
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Books;