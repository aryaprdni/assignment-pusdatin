/* eslint-disable @next/next/no-img-element */
'use client';

import { Product } from '@/entities/product';
import { useProducts } from '@/features/product/hooks/use-product';
import { useDeleteProduct } from '@/features/product/hooks/use-product-mutation';
import { getLocalProducts } from '@/shared/utils/local-storage';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPageContent() {
  const { data, isLoading, error } = useProducts();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const deleteMutation = useDeleteProduct();

  useEffect(() => {
    const local = getLocalProducts();
    setLocalProducts(local);
  }, []);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      const local = getLocalProducts();
      setLocalProducts(local);
    }
  }, [deleteMutation.isSuccess]);

  const itemsPerPage = 8;
  const fetchedProducts = data?.data || [];
  const combinedProducts = [...localProducts, ...fetchedProducts];

  const filtered = combinedProducts.filter((p: Product) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/dashboard/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition">
            + Create Product
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search product..."
        className="w-full max-w-md border px-4 py-2 mb-6 rounded-md shadow-sm"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Failed to load products</p>}

      {filtered.length === 0 && !isLoading ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginated.map((product: Product) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow bg-white flex flex-col justify-between"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 object-contain mx-auto"
                />
                <h2 className="text-sm font-semibold mt-2">{product.title}</h2>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-blue-600 font-bold mt-1">${product.price}</p>

                <div className="flex justify-between mt-2">
                  <Link href={`/dashboard/edit/${product.id}`}>
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteMutation.isPending}
                    className="text-sm text-red-600 hover:underline"
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
