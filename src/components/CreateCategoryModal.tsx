import React, { useState } from 'react';
import { FolderPlus, Sparkles } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';
import { CreateCategoryDto } from '../services/category.service';

interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCategoryDto) => Promise<void>;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await onSubmit(formData);
            onClose();
            setFormData({ name: '', description: '' });
        } catch (error) {
            console.error('Error creating category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Category"
        >
            <div className="space-y-6">
                {/* Animated Header */}
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
                            <FolderPlus className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 flex justify-center gap-2 text-amber-600 dark:text-amber-400"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Create a new category</span>
                        <Sparkles className="w-5 h-5" />
                    </motion.div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-800 dark:text-amber-200 mb-1.5">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl
                                    bg-white dark:bg-amber-950/30
                                    border border-amber-200 dark:border-amber-700/50
                                    text-amber-900 dark:text-amber-100
                                    placeholder-amber-400/60 dark:placeholder-amber-500/50
                                    focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
                                    transition-all duration-300 outline-none"
                                placeholder="e.g., Science Fiction"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-800 dark:text-amber-200 mb-1.5">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl
                                    bg-white dark:bg-amber-950/30
                                    border border-amber-200 dark:border-amber-700/50
                                    text-amber-900 dark:text-amber-100
                                    placeholder-amber-400/60 dark:placeholder-amber-500/50
                                    focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500
                                    transition-all duration-300 outline-none"
                                placeholder="Describe what kind of books belong in this category..."
                                required
                            />
                        </div>
                    </div>

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
                            disabled={loading || !formData.name || !formData.description}
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <FolderPlus className="w-5 h-5" />
                                    Create Category
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateCategoryModal;