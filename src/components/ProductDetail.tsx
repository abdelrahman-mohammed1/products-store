import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { addToCart } from "../store/cartSlice";
import { useState } from "react";
import Loader from "./Loader";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  const { data: product, isLoading } = useQuery<Product>(
    ["product", id],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`
      );
      return response.json();
    }
  );

  if (isLoading) return <Loader />;

  if (!product)
    return (
      <h2 className="text-center m-10 text-[30px] font-bold">
        Product Not Found
      </h2>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          {quantity === 0 ? (
            <button
              onClick={() => {
                setQuantity(1);
                dispatch(addToCart(product));
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex justify-between w-full items-center">
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="bg-blue-500 w-[20%] text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                -
              </button>
              <span className="mx-4 w-[60%] text-center ">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-blue-500 w-[20%] text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
