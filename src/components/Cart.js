import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  // Subscribing the right portion of the store is important for better performance
  const cartItems = useSelector((store) => store.cart.items);

  // Subscribing the whole store will decrease the performance because store will be updated whenever anything changes in the store.
  // const store = useSelector((store) => store);
  // const cartItems = store.cart.items;

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold flex-grow">Cart</h1>
        <button
          className="p-2 bg-black text-white rounded-lg
          "
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="w-6/12 m-auto shadow-lg bg-gray-100 rounded-lg p-2">
        {cartItems.length === 0 && (
          <h1 className="text-center m-4 p-4 text-2xl font-bold">
            Your Cart is Empty. Please Add Items to the Cart.
          </h1>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;