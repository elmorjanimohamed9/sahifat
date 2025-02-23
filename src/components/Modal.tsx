import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop avec flex pour centrer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                            flex items-center justify-center">

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                            className={`w-full ${className} z-50`} >

                            <div className="bg-amber-50 dark:bg-[#1a1412] rounded-2xl shadow-xl
                                border border-amber-200/50 dark:border-amber-800/50 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 border-b border-amber-200/50 dark:border-amber-800/50
                                    flex items-center justify-between">
                                    <h2 className="text-2xl font-bold font-serif
                                        text-amber-900 dark:text-amber-100">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-amber-100 
                                            dark:hover:bg-amber-900/30
                                            transition-colors duration-300"
                                    >
                                        <X size={20} className="text-amber-600 dark:text-amber-400" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;