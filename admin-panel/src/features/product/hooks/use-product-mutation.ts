import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ProductFormInput } from '@/entities/product';
import { ProductService } from '../services/product-service';
import { addLocalProduct, getLocalProducts, setLocalProducts, updateLocalProduct } from '@/shared/utils/local-storage';

export function useCreateProduct() {
    return useMutation({
        mutationFn: (data: ProductFormInput) => ProductService.create(data),
        onSuccess: (res) => {
            const created = {
                ...res.data,
                id: Math.floor(Math.random() * 100000),
            };
            addLocalProduct(created);
        },
    });
}


export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: Product) => {
            const localProducts = getLocalProducts();
            const existsLocally = localProducts.some(p => p.id === product.id);

            if (existsLocally) {
                updateLocalProduct(product);
                return product;
            } else {
                const res = await ProductService.update(product);
                const updatedProduct = res.data || product;
                updateLocalProduct(updatedProduct);
                return updatedProduct;
            }
        },
        onSuccess: (updatedProduct) => {
            queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const localProducts = getLocalProducts();
            const existsLocally = localProducts.some(p => p.id === id);

            if (existsLocally) {
                const updatedLocal = localProducts.filter(p => p.id !== id);
                setLocalProducts(updatedLocal);
                return id;
            } else {
                await ProductService.remove(id);
                return id;
            }
        },
        onSuccess: (deletedId) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', deletedId] });
        },
    });
}
