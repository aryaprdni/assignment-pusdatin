'use client';
import { ProductForm } from '@/features/product/components/product-form';
import { useCreateProduct } from '@/features/product/hooks/use-product-mutation';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateProduct();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create New Product</h1>

      {error && <p className="text-red-500">Failed to create product</p>}

      <ProductForm
        onSubmit={(data) => mutate(data, { onSuccess: () => router.push('/dashboard') })}
        isLoading={isPending}
      />
    </div>
  );
}
