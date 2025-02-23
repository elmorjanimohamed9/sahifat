import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';
import { Category } from '../services/category.service';

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    category: Category | null;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    category
}) => {
    const [loading, setLoading] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const isConfirmEnabled = confirmText === category?.name;

    const handleDelete = async () => {
        try {
            setLoading(true);
            await onConfirm();
            onClose();
        } finally {
            setLoading(false);
            setConfirmText('');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Category"
        >
            <div className="space-y-6">
                {/* Warning Icon */}
                <motion.div 
                    className="text-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 
                            rounded-full blur-lg opacity-70 animate-pulse">
                        </div>
                        <div className="p-4 rounded-full bg-gradient-to-br from-red-500 to-red-600
                            shadow-lg shadow-red-500/20 relative">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center space-y-2"
                    >
                        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
                            Are you sure you want to delete this category?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            This will permanently delete "{category?.name}"
                        </p>
                    </motion.div>

                    {/* Confirmation Input */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm text-gray-600 dark:text-gray-400 text-center">
                            Type <span className="font-medium text-red-600">"{category?.name}"</span> to confirm
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl
                                bg-white dark:bg-red-950/30
                                border border-red-200 dark:border-red-800/50
                                text-red-900 dark:text-red-100
                                placeholder-red-300 dark:placeholder-red-700
                                focus:ring-2 focus:ring-red-500/50 focus:border-red-500
                                transition-all duration-300"
                            placeholder="Type to confirm"
                        />
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                    className="flex gap-3 pt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl
                            text-gray-600 dark:text-gray-400
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            transition-colors duration-300
                            flex items-center justify-center gap-2">
                        <X className="w-5 h-5" />
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={!isConfirmEnabled || loading}
                        className="flex-1 px-4 py-2.5 rounded-xl
                            bg-gradient-to-r from-red-500 to-red-600
                            hover:from-red-600 hover:to-red-700
                            text-white shadow-lg shadow-red-500/20
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-300
                            flex items-center justify-center gap-2
                            group"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Delete Category</span>
                            </>
                        )}
                    </button>
                </motion.div>
            </div>
        </Modal>
    );
};

export default DeleteCategoryModal;