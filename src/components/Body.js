import RestaurantCard, { openRestaurent } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTAURENT_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestraurants, setListOfRestraurant] = useState([]);
  const [filteredRestraurant, setFilteredRestraurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  //Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered", listOfRestraurants);

  const RestaurentCardOpen = openRestaurent(RestaurantCard);  //Higher Order Components

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURENT_API);
      const json = await data.json();
      //console.log( json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants );
      //Optional Chaining
      setListOfRestraurant(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestraurant(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks Like you are offline!! Please check your Internet Connection
      </h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  //Conditional Rendering
  return listOfRestraurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex mx-4 p-4 items-center justify-center">
        <input
          type="text"
          className="border border-solid border-black rounded-md h-10 w-56 pl-2"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="🔎  Search..."
        />
        <button
          className="px-6 py-2 bg-white border-2 m-4 rounded-lg text-green-700 font-bold border-green-700"
          onClick={() => {
            // Search Input Functionality
            console.log(searchText);
            const filteredRestraurant = listOfRestraurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            // console.log(filteredRestraurant);
            setFilteredRestraurant(filteredRestraurant);
          }}
        >
          Search
        </button>

        <button
          className="px-4 py-2 bg-orange-500 font-bold text-white rounded-lg"
          onClick={() => {
            //Filter Logic
            const filteredList = listOfRestraurants.filter(
              (res) => res.info.avgRating > 4.4
            );
            setFilteredRestraurant(filteredList);
          }}
        >
          Top Rated Button
        </button>
        <label className="ml-4 font-bold">User Name : </label>
        <input
          className="border border-solid border-black rounded-md h-10 w-56 ml-4 p-2"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {filteredRestraurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.availability.opened ? (
              //Higher Order Components
              <RestaurentCardOpen resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;