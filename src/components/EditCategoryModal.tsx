import React, { useState, useEffect } from 'react';
import { Edit3, Save, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';
import { Category, UpdateCategoryDto } from '../services/category.service';

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UpdateCategoryDto) => Promise<void>;
    category: Category | null;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    category
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description
            });
            setIsDirty(false);
        }
    }, [category]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isDirty) return;

        try {
            setLoading(true);
            await onSubmit(formData);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Category"
        >
            <div className="space-y-6">
                {/* Header with Icon */}
                <motion.div 
                    className="text-center relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 
                            rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 
                            group-hover:duration-200 animate-tilt">
                        </div>
                        <div className="p-4 rounded-xl
                            bg-gradient-to-br from-amber-500 to-amber-600
                            shadow-lg shadow-amber-500/20 relative">
                            <Edit3 className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Category Stats */}
                    <div className="mt-4 text-amber-600 dark:text-amber-400 text-sm">
                        Editing category details
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center justify-between">
                                <span className="block text-sm font-medium text-amber-800 dark:text-amber-200">
                                    Category Name
                                </span>
                                {formData.name !== category?.name && (
                                    <span className="text-xs text-amber-600 dark:text-amber-400">
                                        Modified
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 mt-1.5 rounded-xl
                                    bg-white dark:bg-amber-950/30
                                    border border-amber-200 dark:border-amber-700/50
                                    text-amber-900 dark:text-amber-100
                                    focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
                                    transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center justify-between">
                                <span className="block text-sm font-medium text-amber-800 dark:text-amber-200">
                                    Description
                                </span>
                                {formData.description !== category?.description && (
                                    <span className="text-xs text-amber-600 dark:text-amber-400">
                                        Modified
                                    </span>
                                )}
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 mt-1.5 rounded-xl
                                    bg-white dark:bg-amber-950/30
                                    border border-amber-200 dark:border-amber-700/50
                                    text-amber-900 dark:text-amber-100
                                    focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
                                    transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Warning Message if Changes */}
                    {isDirty && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 rounded-lg
                                bg-amber-50 dark:bg-amber-900/30
                                border border-amber-200 dark:border-amber-700/50"
                        >
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            <span className="text-sm text-amber-600 dark:text-amber-400">
                                You have unsaved changes
                            </span>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl
                                text-amber-600 dark:text-amber-400
                                hover:bg-amber-100 dark:hover:bg-amber-900/50
                                border border-amber-200 dark:border-amber-700/50
                                transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isDirty || loading}
                            className="flex-1 px-4 py-3 rounded-xl
                                bg-gradient-to-r from-amber-500 to-amber-600
                                hover:from-amber-600 hover:to-amber-700
                                text-white shadow-lg shadow-amber-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-300
                                flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditCategoryModal;