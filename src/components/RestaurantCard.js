import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
  } = resData?.info;


  // just a example that we can use useContext(Context API) anywhere in the application. But for the class based component it will be something different you can check the about us component for that.

  const { loggedInUser } = useContext(UserContext);


  return (
    <div className="m-4 p-4 w-64 h-88 bg-gray-100 shadow-lg rounded-lg flex flex-col justify-between hover:bg-gray-200">
      <img
        className="rounded-lg w-56 h-32 object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <div className="flex-grow">
        <h3 className="font-bold py-4 text-lg truncate" title={name}>{name}</h3>
        <h4 className="font-medium py-1 truncate" title={cuisines.join(", ")}>{cuisines.join(", ")}</h4>
        <h4 className="font-medium py-1" title={avgRating}>{avgRating}</h4>
        <h4 className="font-medium py-1" title={costForTwo}>{costForTwo}</h4>
        <h4 className="font-medium py-1" title={sla?.slaString}>{sla?.slaString}</h4>
        {/* Context API Uses */}
        {/* <h4 className="font-medium py-1" title={loggedInUser}>User: {loggedInUser}</h4>  */}
      </div>
    </div>
  );
};

//Higher Order Components
export const openRestaurent = (RestaurantCard) => {
  return (props) => {
    return (
       <div>
        <label className="absolute bg-gray-100 text-black ml-9 mt-5 p-1 rounded-md w-16 text-center font-bold">Open</label>
        <RestaurantCard {...props}/>
       </div>
    )
  }
}

export default RestaurantCard;