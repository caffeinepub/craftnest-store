import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_REVIEWS } from "../data/seedData";
import type { Category, ContactMessage, Product, Review } from "../types";

interface StoreContextValue {
  categories: Category[];
  products: Product[];
  reviews: Review[];
  contactMessages: ContactMessage[];

  // Category CRUD
  addCategory: (cat: Omit<Category, "id">) => void;
  updateCategory: (id: number, cat: Partial<Category>) => void;
  deleteCategory: (id: number) => void;

  // Product CRUD
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: number, p: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  // Review CRUD
  addReview: (r: Omit<Review, "id">) => void;
  updateReview: (id: number, r: Partial<Review>) => void;
  deleteReview: (id: number) => void;
  approveReview: (id: number) => void;

  // Contact
  submitContactMessage: (name: string, email: string, message: string) => void;

  nextId: (arr: { id: number }[]) => number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage("cn_categories", SEED_CATEGORIES),
  );
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage("cn_products", SEED_PRODUCTS),
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadFromStorage("cn_reviews", SEED_REVIEWS),
  );
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() =>
    loadFromStorage("cn_messages", []),
  );

  useEffect(() => saveToStorage("cn_categories", categories), [categories]);
  useEffect(() => saveToStorage("cn_products", products), [products]);
  useEffect(() => saveToStorage("cn_reviews", reviews), [reviews]);
  useEffect(
    () => saveToStorage("cn_messages", contactMessages),
    [contactMessages],
  );

  const nextId = useCallback(
    (arr: { id: number }[]) =>
      arr.length === 0 ? 1 : Math.max(...arr.map((x) => x.id)) + 1,
    [],
  );

  // Categories
  const addCategory = (cat: Omit<Category, "id">) =>
    setCategories((prev) => [...prev, { ...cat, id: nextId(prev) }]);
  const updateCategory = (id: number, cat: Partial<Category>) =>
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...cat } : c)),
    );
  const deleteCategory = (id: number) =>
    setCategories((prev) => prev.filter((c) => c.id !== id));

  // Products
  const addProduct = (p: Omit<Product, "id">) =>
    setProducts((prev) => [...prev, { ...p, id: nextId(prev) }]);
  const updateProduct = (id: number, p: Partial<Product>) =>
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const deleteProduct = (id: number) =>
    setProducts((prev) => prev.filter((x) => x.id !== id));

  // Reviews
  const addReview = (r: Omit<Review, "id">) =>
    setReviews((prev) => [...prev, { ...r, id: nextId(prev) }]);
  const updateReview = (id: number, r: Partial<Review>) =>
    setReviews((prev) => prev.map((x) => (x.id === id ? { ...x, ...r } : x)));
  const deleteReview = (id: number) =>
    setReviews((prev) => prev.filter((x) => x.id !== id));
  const approveReview = (id: number) =>
    setReviews((prev) =>
      prev.map((x) => (x.id === id ? { ...x, approved: true } : x)),
    );

  // Contact
  const submitContactMessage = (name: string, email: string, message: string) =>
    setContactMessages((prev) => [
      ...prev,
      { id: nextId(prev), name, email, message, timestamp: Date.now() },
    ]);

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        reviews,
        contactMessages,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        updateReview,
        deleteReview,
        approveReview,
        submitContactMessage,
        nextId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
