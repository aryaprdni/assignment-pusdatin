import { Product } from '@/entities/product';
import { FakeStoreAPI } from '@/infrastructure/fakestore-api';

export const ProductService = {
    getAll: FakeStoreAPI.getAll,
    getById: FakeStoreAPI.getById,
    create: FakeStoreAPI.create,
    update: (product: Product) => FakeStoreAPI.update(product.id, product),
    remove: FakeStoreAPI.remove,
};