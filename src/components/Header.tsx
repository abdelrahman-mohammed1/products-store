import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const cartItems = useSelector(
    (store: any = {}) => store?.account?.items || []
  );
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-Commerce Store
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-600">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-600">
                Cart{" "}
                {cartItems?.length > 0 ? `(${cartItems?.length})` : "empty"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
