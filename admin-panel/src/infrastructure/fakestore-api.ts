import { Product } from '@/entities/product';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/products';

export const FakeStoreAPI = {
    getAll: () => axios.get(`${API_URL}`),
    getById: (id: number) => axios.get(`${API_URL}/${id}`),
    create: (data: Partial<Product>) => axios.post(API_URL, data),
    update: (id: number, data: Partial<Product>) => axios.put(`${API_URL}/${id}`, data),
    remove: (id: number) => axios.delete(`${API_URL}/${id}`),
};