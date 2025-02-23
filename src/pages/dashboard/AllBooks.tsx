import React, { useState, useEffect } from 'react';
import {
    BookOpen, Search, Download,
    Plus, Edit2, Trash2, Eye,
    SortAsc, SortDesc, Check, X,
    Sparkles, Library, BookMarked
} from 'lucide-react';
import { bookService } from '../../services/book.service';
import { categoryService } from '../../services/category.service';
import CreateBookModal from '../../components/CreateBookModal';
import { toast } from 'sonner';
import { Book } from '../../types/book';
import { Category } from '../../types/category';

const AllBooks: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Book;
        direction: 'asc' | 'desc';
    }>({ key: 'title', direction: 'asc' });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Chargement initial
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [booksData, categoriesData] = await Promise.all([
                bookService.getAllBooks(),
                categoryService.getAllCategories()
            ]);
            setBooks(booksData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error loading initial data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSuccess = async () => {
        await loadInitialData();
        setIsCreateModalOpen(false);
        toast.success('Book added successfully!');
    };

    const handleSort = (key: keyof Book) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const handleDelete = async (bookId: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await bookService.deleteBook(bookId);
                await loadInitialData();
                toast.success('Book deleted successfully');
            } catch (error) {
                console.error('Error deleting book:', error);
                toast.error('Failed to delete book');
            }
        }
    };

    // Filtrage et tri des livres
    const filteredAndSortedBooks = [...books]
        .filter(book => 
            (searchTerm === '' || 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (selectedCategory === '' || book.categoryId === selectedCategory)
        )
        .sort((a, b) => {
            const key = sortConfig.key;
            const aValue = a[key] ?? '';
            const bValue = b[key] ?? '';

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

    // Stats pour le dashboard
    const stats = [
        { 
            label: 'Total Books', 
            value: books.length, 
            icon: BookOpen,
            color: 'amber'
        },
        { 
            label: 'Available', 
            value: books.filter(b => b.available).length, 
            icon: BookMarked,
            color: 'amber'
        },
        { 
            label: 'Borrowed', 
            value: books.filter(b => !b.available).length, 
            icon: Library,
            color: 'amber'
        },
        { 
            label: 'Categories', 
            value: categories.length, 
            icon: Sparkles,
            color: 'amber'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-amber-500/30 
                        border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-amber-600 dark:text-amber-400">
                        Loading library data...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="rounded-2xl bg-gradient-to-r 
                from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 
                p-6 shadow-lg border border-amber-100/50 dark:border-amber-800/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 
                            p-4 rounded-full shadow-lg">
                            <Library className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-200">
                                    Library Collection
                                </h1>
                                <span className="px-3 py-1 rounded-full text-sm 
                                    bg-amber-100 dark:bg-amber-900/50 
                                    text-amber-800 dark:text-amber-200 
                                    border border-amber-200 dark:border-amber-700/50">
                                    <span className="flex items-center gap-1">
                                        <Sparkles className="w-4 h-4" />
                                        <span>{books.length} Books</span>
                                    </span>
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                                Explore and manage our extensive collection of books. Add new titles,
                                update information, and keep track of our growing library.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 
                            hover:from-amber-700 hover:to-amber-800
                            text-white rounded-xl transition-colors duration-300
                            shadow-lg shadow-amber-600/20
                            flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        <span>Add New Book</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index}
                            className="bg-white/30 dark:bg-amber-950/20 rounded-xl p-4
                                border border-amber-100 dark:border-amber-800/50
                                hover:bg-white/50 dark:hover:bg-amber-900/30
                                transition-colors duration-300">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg 
                                    bg-${stat.color}-100 dark:bg-${stat.color}-900/50
                                    text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 bg-white/30 dark:bg-amber-950/20 p-4 
                rounded-xl shadow-lg border border-amber-100/50 dark:border-amber-800/50">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                        w-5 h-5 text-amber-500" />
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg
                            bg-white dark:bg-amber-900/30
                            border border-amber-200 dark:border-amber-700/50
                            text-amber-900 dark:text-amber-100
                            placeholder:text-amber-400
                            focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
                            transition-all duration-300"
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg
                        bg-white dark:bg-amber-900/30
                        border border-amber-200 dark:border-amber-700/50
                        text-amber-900 dark:text-amber-100
                        focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
                        transition-all duration-300"
                >
                    <option className='text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950' value="">All Categories</option>
                    {categories.map(category => (
                        <option className='text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950' key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className="px-4 py-2 
                    bg-amber-50 dark:bg-amber-900/20
                    text-amber-700 dark:text-amber-300
                    hover:bg-amber-100 dark:hover:bg-amber-800/40
                    border border-amber-200 dark:border-amber-700/50
                    rounded-lg flex items-center gap-2 
                    transition-colors duration-300">
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Export</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white/30 dark:bg-amber-950/20 
                rounded-xl shadow-lg overflow-hidden
                border border-amber-100/50 dark:border-amber-800/50">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-amber-100/50 dark:bg-amber-900/50">
                                {[
                                    { key: 'title', label: 'Title' },
                                    { key: 'author', label: 'Author' },
                                    { key: 'isbn', label: 'ISBN' },
                                    { key: 'quantity', label: 'Quantity' },
                                    { key: 'publishedYear', label: 'Year' },
                                    { key: 'available', label: 'Status' },
                                    { key: 'actions', label: 'Actions' }
                                ].map(({ key, label }) => (
                                    <th key={key}
                                        className="px-6 py-4 text-left text-sm font-semibold 
                                            text-amber-800 dark:text-amber-200">
                                        <button
                                            className="flex items-center gap-2 hover:text-amber-600 
                                                dark:hover:text-amber-400 transition-colors"
                                            onClick={() => key !== 'actions' && handleSort(key as keyof Book)}
                                        >
                                            {label}
                                            {sortConfig.key === key && (
                                                sortConfig.direction === 'asc'
                                                    ? <SortAsc className="w-4 h-4" />
                                                    : <SortDesc className="w-4 h-4" />
                                            )}
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-200/50 dark:divide-amber-700/50">
                            {filteredAndSortedBooks.map((book) => (
                                <tr key={book.id} className="hover:bg-amber-50/50 
                                    dark:hover:bg-amber-900/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={book.imageUrl || 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1769&auto=format&fit=crop'}
                                                alt={book.title}
                                                className="w-12 h-12 object-cover rounded-full shadow-md"
                                            />
                                            <div className="font-medium text-amber-900 dark:text-amber-100">
                                                {book.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-amber-800 dark:text-amber-200">
                                        {book.author}
                                    </td>
                                    <td className="px-6 py-4 text-amber-800 dark:text-amber-200">
                                        {book.isbn}
                                    </td>
                                    <td className="px-6 py-4 text-amber-800 dark:text-amber-200">
                                        {book.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-amber-800 dark:text-amber-200">
                                        {book.publishedYear}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 
                                            rounded-full text-xs font-medium
                                            ${book.available
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                            }`}>
                                            {book.available 
                                                ? <Check className="w-3 h-3" /> 
                                                : <X className="w-3 h-3" />
                                            }
                                            {book.available ? 'Available' : 'Borrowed'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 rounded-lg
                                                hover:bg-amber-100 dark:hover:bg-amber-800/50
                                                text-amber-600 dark:text-amber-400
                                                transition-colors">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button className="p-1.5 rounded-lg
                                                hover:bg-amber-100 dark:hover:bg-amber-800/50
                                                text-amber-600 dark:text-amber-400
                                                transition-colors">
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => book.id && handleDelete(book.id)}
                                                className="p-1.5 rounded-lg
                                                    hover:bg-red-100 dark:hover:bg-red-900/30
                                                    text-red-600 dark:text-red-400
                                                    transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Book Modal */}
            <CreateBookModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />
        </div>
    );
};

export default AllBooks;