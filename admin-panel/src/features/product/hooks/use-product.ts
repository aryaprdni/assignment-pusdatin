import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services/product-service';
import { getLocalProducts } from '@/shared/utils/local-storage';

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => ProductService.getAll(),
    });
}

export function useProduct(id: number) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await ProductService.getById(id);
            const apiProduct = res.data;

            const localProducts = getLocalProducts();
            const localProduct = localProducts.find(p => p.id === id);

            return localProduct || apiProduct;
        },
        enabled: !!id,
    });
}
