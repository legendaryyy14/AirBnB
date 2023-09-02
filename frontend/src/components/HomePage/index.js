import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import "./HomePage.css"

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
<link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic" rel="stylesheet" />
      <div className="spot-tile-list">
        {spots.map((spot) => (
          <NavLink key={spot.id} className="spot-card" to={`/spots/${spot.id}`}>
            <img className="previmg" src={`${spot.previewImage}`} alt='prev_img' title={`${spot.name}`}/>
            <div className="spot-info">
              <div className="spot-details">
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} night</p>
              </div>

            <div className="spot-ratings">
            <i class="fa-solid fa-star"></i> {getRatingOrNew(spot.avgRating)}
            </div>

            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
