import * as Yup from 'yup';

export const bookValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must be at most 100 characters'),
    author: Yup.string()
        .required('Author is required')
        .min(2, 'Author must be at least 2 characters')
        .max(100, 'Author must be at most 100 characters'),
    isbn: Yup.string()
        .required('ISBN is required')
        .matches(/^[0-9-]+$/, 'ISBN must contain only numbers and hyphens'),
    categoryId: Yup.string()
        .required('Category is required'),
    quantity: Yup.number()
        .required('Quantity is required')
        .min(0, 'Quantity must be at least 0')
        .integer('Quantity must be a whole number'),
    publishedYear: Yup.number()
        .required('Published year is required')
        .min(1800, 'Year must be 1800 or later')
        .max(new Date().getFullYear(), 'Year cannot be in the future')
        .integer('Year must be a whole number'),
    description: Yup.string()
        .max(1000, 'Description must be at most 1000 characters'),
    imageUrl: Yup.string()
        .url('Must be a valid URL')
});

export const initialBookValues = {
    title: '',
    author: '',
    isbn: '',
    categoryId: '',
    quantity: 1,
    description: '',
    publishedYear: new Date().getFullYear(),
    imageUrl: ''
};

export type BookFormValues = Yup.InferType<typeof bookValidationSchema>;