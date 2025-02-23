export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    categoryId: string;
    quantity: number;
    description?: string;
    publishedYear: number;
    available: boolean;
    imageUrl?: string;
} 