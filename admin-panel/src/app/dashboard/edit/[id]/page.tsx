'use client';

import { useRouter, useParams } from 'next/navigation';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductFormInput, Product } from '@/entities/product';
import { useProduct } from '@/features/product/hooks/use-product';
import { useUpdateProduct } from '@/features/product/hooks/use-product-mutation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;

  const { data: product, isLoading } = useProduct(id ?? 0);
  const { mutate, isPending: isUpdating } = useUpdateProduct();

  const handleSubmit = (data: ProductFormInput) => {
    if (!id) return;

    const updatedProduct: Product = { ...data, id };

    mutate(updatedProduct, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  if (isLoading) return <p className="text-center">Loading product data...</p>;
  if (!product) return <p className="text-center">Product not found or loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <ProductForm
        key={product.id}
        onSubmit={handleSubmit}
        defaultValues={product}
        isLoading={isUpdating}
      />
    </div>
  );
}
