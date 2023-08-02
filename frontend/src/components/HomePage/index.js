import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const spotsObject = useSelector((state) => state.spots);
  const spots = Object.values(spotsObject);
  console.log(spots)

  const getRatingOrNew = (avgRating) => {
    return avgRating ? avgRating : "New";
  };
  return (
    <div className="home-page">
      <h1>Spots</h1>
      <div className="spot-tile-list">
        {spots.map((spot) => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <img className="previmg" src={`${spot.previewImage}`} alt='prev_img' title={`${spot.name}`}/>
            <p>{spot.city}, {spot.state}</p>
            <p>
                {getRatingOrNew(spot.avgRating)}
            </p>
            <p>${spot.price} night</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
