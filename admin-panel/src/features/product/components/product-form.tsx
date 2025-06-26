'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormInput } from '@/entities/product';
import { useEffect } from 'react';

export function ProductForm({
  onSubmit,
  defaultValues,
  isLoading,
}: {
  onSubmit: (data: ProductFormInput) => void;
  defaultValues?: ProductFormInput;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const fields = [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Description', name: 'description', type: 'text' },
    { label: 'Category', name: 'category', type: 'text' },
    { label: 'Image URL', name: 'image', type: 'text' },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-xl shadow">
      {fields.map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            type={type}
            step={name === 'price' ? '0.01' : undefined}
            {...register(name as keyof ProductFormInput, name === 'price' ? { valueAsNumber: true } : {})}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors[name as keyof ProductFormInput] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name as keyof ProductFormInput]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
