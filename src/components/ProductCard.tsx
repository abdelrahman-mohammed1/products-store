import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

interface Store {
  account: {
    items: Array<{
      id: number;
      image: string;
      title: string;
      price: number;
    }>;
  };
}

const ProductCard = () => {
  const productCartItems = useSelector((store: Store) => store?.account?.items);
  const dispatch = useDispatch();
  const total = productCartItems?.reduce(
    (sum: number, item: { price: number }) => sum + item.price,
    0
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {productCartItems?.length === 0 ? (
        <h2 className="text-center m-10 text-[30px] font-bold">
          Your cart is empty.
        </h2>
      ) : (
        <div>
          {productCartItems?.map(
            (item: {
              id: number;
              image: string;
              title: string;
              price: number;
            }) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )
          )}
          <div className="mt-4 text-right">
            <p className="text-xl font-semibold">Total: ${total?.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
