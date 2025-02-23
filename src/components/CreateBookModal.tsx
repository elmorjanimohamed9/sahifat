import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Upload, Plus } from 'lucide-react';
import Modal from './Modal';
import { FormField } from './FormField';
import { bookService, CreateBookDto } from '../services/book.service';
import { bookValidationSchema, initialBookValues } from '../validations/bookValidation';
import { toast } from 'sonner';
import { Category, categoryService } from '../services/category.service';

interface CreateBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories');
            }
        };

        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const formik = useFormik({
        initialValues: initialBookValues,
        validationSchema: bookValidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await bookService.createBook(values as CreateBookDto);
                toast.success('Book created successfully!');
                onSuccess?.();
                onClose();
                formik.resetForm();
                setImagePreview(null);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message;
                toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage || 'Failed to create book');
            } finally {
                setLoading(false);
            }
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                formik.setFieldValue('imageUrl', result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Book"
            className="max-w-5xl"
        >
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Main Content Grid */}
                <div className=" flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Image Upload */}
                    <div className="lg:w-1/3 flex items-center">
                        <div className="w-full">
                            <div className="relative group aspect-[3/4] max-h-[450px] mx-auto">
                                <div className="relative h-full rounded-xl overflow-hidden
                    border-2 border-dashed border-amber-300 dark:border-amber-700
                    bg-gradient-to-br from-amber-50 to-amber-100/50 
                    dark:from-amber-950/30 dark:to-amber-900/20
                    group-hover:border-amber-400 transition-all duration-300">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                            <Upload className="w-10 h-10 text-amber-400 dark:text-amber-600 mb-2" />
                                            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                                                Drop cover here<br />or click to upload
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form Fields */}
                    <div className="lg:w-2/3 flex items-center">
                        <div className="w-full space-y-5">
                            {/* Basic Info Section */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="title"
                                    label="Title"
                                    formik={formik}
                                    required
                                    placeholder="Enter book title"
                                />
                                <FormField
                                    name="author"
                                    label="Author"
                                    formik={formik}
                                    required
                                    placeholder="Enter author name"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="isbn"
                                    label="ISBN"
                                    formik={formik}
                                    required
                                    placeholder="Enter ISBN"
                                />
                                <FormField
                                    name="categoryId"
                                    label="Category"
                                    as="select"
                                    formik={formik}
                                    required
                                >
                                    <option className='text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950' value="">Select a category</option>
                                    {categories.map(category => (
                                        <option className='text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950' key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </FormField>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="quantity"
                                    label="Quantity"
                                    type="number"
                                    formik={formik}
                                    required
                                    min="0"
                                    placeholder="Enter quantity"
                                />
                                <FormField
                                    name="publishedYear"
                                    label="Published Year"
                                    type="number"
                                    formik={formik}
                                    required
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    placeholder="Enter year"
                                />
                            </div>

                            {/* Description Field */}
                            <FormField
                                name="description"
                                label="Description"
                                as="textarea"
                                formik={formik}
                                rows={3}
                                placeholder="Enter book description"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-amber-200 dark:border-amber-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg
                            text-amber-600 dark:text-amber-400
                            hover:bg-amber-100 dark:hover:bg-amber-900/50
                            border-2 border-transparent hover:border-amber-200 
                            dark:hover:border-amber-800/50
                            transition-all duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !formik.isValid || !formik.dirty}
                        className="px-4 py-2 rounded-lg
                            bg-gradient-to-r from-amber-500 to-amber-600
                            hover:from-amber-600 hover:to-amber-700
                            text-white shadow-lg shadow-amber-500/25
                            hover:shadow-amber-500/40 hover:scale-[1.02]
                            flex items-center gap-2
                            transition-all duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            disabled:hover:scale-100"
                    >
                        {loading ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/20 
                                    border-t-white rounded-full animate-spin" />
                                Creating...
                            </span>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Create Book
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateBookModal;