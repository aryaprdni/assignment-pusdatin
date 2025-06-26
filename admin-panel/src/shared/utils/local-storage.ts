import { Product } from '@/entities/product';

const LOCAL_KEY = 'localProducts';

export const getLocalProducts = (): Product[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const addLocalProduct = (product: Product) => {
    const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    localStorage.setItem(LOCAL_KEY, JSON.stringify([product, ...existing]));
};

export const updateLocalProduct = (updated: Product) => {
    const existing: Product[] = getLocalProducts();
    const updatedList = existing.map((p) => (p.id === updated.id ? updated : p));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedList));
};

export const setLocalProducts = (products: Product[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(products));
};