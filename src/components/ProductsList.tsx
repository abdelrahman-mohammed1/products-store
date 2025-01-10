import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useQuery } from "react-query";
import Loader from "./Loader";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery("products", () =>
    fetch(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}`).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product: Product) => product.category))
      ) as string[];
      setCategories(["all", ...uniqueCategories]);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <h2 className="text-center m-10 text-[30px] font-bold">
        Error Loading Products
      </h2>
    );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleIncreaseQuantity = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const handleDecreaseQuantity = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(prev[productId] - 1, 0),
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            {quantities[product.id] ? (
              <div className="flex items-center mt-auto">
                <button
                  onClick={() => handleDecreaseQuantity(product.id)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-4 py-2 border-t border-b">
                  {quantities[product.id]}
                </span>
                <button
                  onClick={() => handleIncreaseQuantity(product.id)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
