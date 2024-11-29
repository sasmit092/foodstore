import { LOGO_URL } from "../utils/constants";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

// let btnName = "Login";

const Header = () => {
  const [btnNameLogin, setBtnNameLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // Selector(Subscribing to the store using selector)
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  //if no dependency array ==> useEffect is called on every render
  //if dependency array is empty =[] ==> useEffect is called on initial render(just once)
  // if dependency array is [btnNameLogin](means anything present inside dependency array) useEffect is called everytime btnNameReact is updated
  useEffect(() => {
    console.log("useEffect called");
  });

  return (
    <div className="flex justify-between shadow-lg sticky top-0 bg-white z-50">
      <div className="logo-container">
        <Link to="/">
          <img className="w-36" src={LOGO_URL} alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4 font-medium cursor-pointer text-xl">
            Online Status : {onlineStatus ? "✅" : "🔴"}
          </li>
          <li className="px-4 font-medium cursor-pointer text-xl">
            <Link style={{ textDecoration: "none" }} to="/">
              🏠 Home
            </Link>
          </li>
          <li className="px-4 font-medium cursor-pointer text-xl">
            <Link style={{ textDecoration: "none" }} to="/about">
              ℹ About Us
            </Link>
          </li>
          <li className="px-4 font-medium cursor-pointer text-xl">
            <Link style={{ textDecoration: "none" }} to="/contact">
              ✉ Contact Us
            </Link>
          </li>
          <li className="px-4 font-medium cursor-pointer text-xl">
            <Link style={{ textDecoration: "none" }} to="/grocery">
              🏬 Grocery
            </Link>
          </li>
          <li className="px-4 font-medium cursor-pointer text-xl">
          <Link style={{ textDecoration: "none" }} to="/cart">
            🛒 Cart ({cartItems.length} Items)
          </Link>
          </li>
          <button
            className="px-4 font-medium cursor-pointer text-xl"
            onClick={() => {
              btnNameLogin === "Login"
                ? setBtnNameLogin("Logout")
                : setBtnNameLogin("Login");
            }}
          >
            {btnNameLogin}
          </button>
          <li className="px-4 font-medium cursor-pointer text-xl">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;