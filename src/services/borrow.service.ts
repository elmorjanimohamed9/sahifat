import { api } from '../config/axios';

export interface Borrow {
    id: string;
    bookId: string;
    userId: string;
    borrowDate: string;
    returnDate?: string;
}

export interface CreateBorrowDto {
    bookId: string;
    userId: string;
}

export const borrowService = {
    borrowBook: async (borrowData: CreateBorrowDto) => {
        const response = await api.post('/borrows', borrowData);
        return response.data;
    },

    returnBook: async (borrowId: string) => {
        const response = await api.post(`/borrows/${borrowId}/return`);
        return response.data;
    },

    getAllBorrows: async () => {
        const response = await api.get('/borrows');
        return response.data;
    },

    getBorrowById: async (id: string) => {
        const response = await api.get(`/borrows/${id}`);
        return response.data;
    }
}; 