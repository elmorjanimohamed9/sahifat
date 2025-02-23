import React, { useState, useEffect } from 'react';
import {
    FolderOpen, Search, Plus, Edit2, Trash2,
    BookOpen, AlertCircle
} from 'lucide-react';
import { categoryService, CreateCategoryDto, UpdateCategoryDto, type Category } from '../../services/category.service';
import { toast } from 'sonner';
import CategoryModal from '../../components/CreateCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';
import DeleteCategoryModal from '../../components/DeleteCategoryModal';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    const handleCreateCategory = async (data: CreateCategoryDto) => {
        try {
            setLoading(true);
            await categoryService.createCategory(data);
            toast.success('Category created successfully');
            loadCategories();
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async (data: UpdateCategoryDto) => {
        try {
            if (!editingCategory) return;
            await categoryService.updateCategory(editingCategory.id, data);
            toast.success('Category updated successfully');
            loadCategories();
            setEditingCategory(null);
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category');
        }
    };

    const handleDeleteCategory = async () => {
        try {
            if (!deletingCategory) return;
            await categoryService.deleteCategory(deletingCategory.id);
            toast.success('Category deleted successfully');
            loadCategories();
            setDeletingCategory(null);
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category');
        }
    };

    // Load categories
    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const renderTableBody = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-amber-600">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent 
                                rounded-full animate-spin" />
                            Loading categories...
                        </div>
                    </td>
                </tr>
            );
        }

        if (categories.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-amber-600">
                        No categories found
                    </td>
                </tr>
            );
        }

        return categories.map((category) => (
            <tr key={category.id}
                className="hover:bg-amber-50 dark:hover:bg-amber-900/20
                    transition-colors group">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-100 
                            dark:bg-amber-900/50 group-hover:bg-amber-200 
                            dark:group-hover:bg-amber-800/50 transition-colors">
                            <FolderOpen className="w-5 h-5 text-amber-600 
                                dark:text-amber-400" />
                        </div>
                        <span className="font-medium text-amber-900 
                            dark:text-amber-100">
                            {category.name}
                        </span>
                    </div>
                </td>
                <td className="px-6 py-4 text-amber-700 dark:text-amber-300">
                    {category.description}
                </td>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1
                        rounded-full text-sm font-medium
                        bg-amber-100 dark:bg-amber-900/30 
                        text-amber-800 dark:text-amber-300
                        border border-amber-200 dark:border-amber-700/50">
                        {category.booksCount || 0} books
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={() => setEditingCategory(category)}
                            className="p-2 rounded-lg
                                hover:bg-amber-100 dark:hover:bg-amber-900/50
                                text-amber-600 dark:text-amber-400
                                transition-colors">
                            <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => {
                                setDeletingCategory(category);
                            }}
                            className="p-2 rounded-lg
                                hover:bg-red-100 dark:hover:bg-red-900/30
                                text-red-600 dark:text-red-400
                                transition-colors" >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 
                dark:from-amber-900/20 dark:to-orange-900/20 
                rounded-xl p-6 shadow-lg
                border border-amber-200/50 dark:border-amber-800/50">

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 
                            rounded-xl shadow-lg">
                                <FolderOpen className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                    Categories Management
                                </h1>
                                <p className="text-amber-600 dark:text-amber-400">
                                    Organize your library with custom categories
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 
                            hover:from-amber-700 hover:to-amber-800
                            text-white rounded-xl shadow-lg 
                            flex items-center gap-2 transition-all duration-300
                            hover:shadow-amber-600/25 hover:scale-105">
                            <Plus className="w-5 h-5" />
                            Add New Category
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[
                            {
                                label: 'Total Categories',
                                value: categories.length,
                                icon: FolderOpen,
                                color: 'text-amber-600'
                            },
                            {
                                label: 'Most Used Category',
                                value: 'Fiction',
                                icon: BookOpen,
                                color: 'text-amber-600'
                            },
                            {
                                label: 'Empty Categories',
                                value: '2',
                                icon: AlertCircle,
                                color: 'text-amber-600'
                            }
                        ].map((stat, index) => (
                            <div key={index}
                                className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4
                                border border-amber-200/50 dark:border-amber-800/50
                                hover:shadow-lg transition-all duration-300
                                hover:border-amber-300 dark:hover:border-amber-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-amber-600 dark:text-amber-400">
                                            {stat.label}
                                        </p>
                                        <p className="text-xl font-bold text-amber-900 dark:text-amber-100">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 
                        text-amber-500 dark:text-amber-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl
                            bg-amber-50 dark:bg-amber-900/20
                            border border-amber-200 dark:border-amber-800/50
                            text-amber-900 dark:text-amber-100
                            placeholder-amber-400 dark:placeholder-amber-500/50
                            focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
                            transition-all duration-300 outline-none"
                        />
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-lg overflow-hidden
                border border-amber-200/50 dark:border-amber-800/50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-amber-50 dark:bg-amber-900/20">
                                <tr className="bg-amber-50 dark:bg-amber-900/20">
                                    <th className="px-6 py-4 text-left text-sm font-semibold 
                                    text-amber-900 dark:text-amber-100">
                                        Category Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold 
                                    text-amber-900 dark:text-amber-100">
                                        Description
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold 
                                    text-amber-900 dark:text-amber-100">
                                        Books Count
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold 
                                    text-amber-900 dark:text-amber-100">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-amber-50 dark:bg-amber-900/20 divide-y divide-amber-100 dark:divide-amber-800/50">
                                {renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Create Category Modal */}
            <CategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCategory}
            />

            {/* Edit Category Modal */}
            <EditCategoryModal
                isOpen={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                onSubmit={handleUpdateCategory}
                category={editingCategory}
            />

            {/* Delete Category Modal */}
            <DeleteCategoryModal
                isOpen={!!deletingCategory}
                onClose={() => setDeletingCategory(null)}
                onConfirm={handleDeleteCategory}
                category={deletingCategory}
            />
        </>
    );
};

export default Categories;