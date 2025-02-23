import { api } from '../config/axios';

export interface Category {
    id: string;
    name: string;
    description: string;
    booksCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateCategoryDto {
    name: string;
    description: string;
}

export interface UpdateCategoryDto {
    name?: string;
    description?: string;
}

export const categoryService = {

    getAllCategories: async (): Promise<Category[]> => {
        const response = await api.get('/categories');
        return response.data;
    },

    getCategoryById: async (id: string): Promise<Category> => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    createCategory: async (categoryData: CreateCategoryDto): Promise<Category> => {
        const response = await api.post('/categories', categoryData);
        return response.data;
    },

    updateCategory: async (id: string, categoryData: UpdateCategoryDto): Promise<Category> => {
        const response = await api.put(`/categories/${id}`, categoryData);
        return response.data;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },

    searchCategories: async (searchTerm: string): Promise<Category[]> => {
        const response = await api.get('/categories', {
            params: { search: searchTerm }
        });
        return response.data;
    }
}; 