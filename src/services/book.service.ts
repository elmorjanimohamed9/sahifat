import { api } from '../config/axios';

export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  categoryId: string;
  quantity: number;
  description?: string;
  publishedYear?: number;
  imageUrl?: string;
}

interface SearchBookParams {
  title?: string;
  author?: string;
  category?: string;
}

export const bookService = {
  searchBooks: async (params: SearchBookParams) => {
    const response = await api.get('/books/search', { params });
    return response.data;
  },

  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  getBookById: async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (bookData: CreateBookDto): Promise<CreateBookDto> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<CreateBookDto>) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string) => {
    await api.delete(`/books/${id}`);
  }
}; 