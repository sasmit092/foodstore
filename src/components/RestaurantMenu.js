//import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import { CDN_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const { restaurantId } = useParams();
  const resInfo = useRestaurantMenu(restaurantId);
  const [showIndex, setShowIndex] = useState(0);
  const onlineStatus = useOnlineStatus();

  const dummy = "Dummy Data"

  if (onlineStatus === false)
    return (
      <h1>
        Looks Like you are offline!! Please check your Internet Connection
      </h1>
    );
  // Here we were fetching the data, but right now we are fetching the data using Cutom Hook i.e. useRestaurentMenu Hook
  //Previously we were following the below code
  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(
  //     MENU_API + restaurantId
  //   );

  //   const json = await data.json();
  //   setResInfo(json.data);
  //   //console.log(resInfo?.cards[2]?.card?.card?.info.name)
  // };

  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  //console.log(itemCards)
  //console.log("Price",resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards)
  //console.log("Info",resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log("Categories", categories);

  return (
    <div className="text-center">
      <div className="border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-200 p-2 w-1/3 rounded-lg flex flex-col m-auto mt-4">
        <div className="bg-white p-4 border-2 border-gray-300 rounded-lg">
          <h1 className="font-bold text-2xl my-4"> {name} </h1>
          <p className="font-bold text-lg ml-4">
            {cuisines.join(", ")} - {costForTwoMessage}
          </p>
        </div>
      </div>
      {/* This is only for recommended ItemCategory */}
      {/* <div>
        <h2 className="font-bold text-3xl mx-80">Menu</h2>
        <ul>
          {itemCards.map((item) => (
            <li
              className="font-semibold text-xl bg-gray-100 shadow-lg rounded-lg p-4 my-4 h-40 w-[60%] m-auto flex justify-between items-center"
              key={item?.card?.info?.id}
            >
              <div>
                <div>{item?.card?.info?.name}</div>
                <div>
                  {"Rs."}
                  {item?.card?.info?.price
                    ? item?.card?.info?.price / 100 + "/-"
                    : item?.card?.info?.defaultPrice / 100 + "/-"}
                </div>
                <div className="mt-2">
                  {"⭐ " + item?.card?.info?.ratings?.aggregatedRating?.rating}(
                  {item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
                </div>
              </div>

              <div>
                <img
                  className="rounded-lg w-56 h-32"
                  src={CDN_URL + item?.card?.info?.imageId}
                  alt="menu-logo"
                />
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      {/* This is for All Categories */}
      {categories.map((category, index) => (
        //This is controlled Component
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card?.title}
          showItems={index === showIndex}
          //setShowIndex={() => setShowIndex(index)}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          dummy={dummy}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;