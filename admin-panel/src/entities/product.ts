import { z } from 'zod';

export const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.number().positive('Price must be positive'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    image: z.string().url('Image must be a valid URL'),
});

export type ProductFormInput = z.infer<typeof productSchema>;

export interface Product extends ProductFormInput {
    id: number;
}
