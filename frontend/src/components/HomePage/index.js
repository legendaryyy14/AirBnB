import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";

const HomePage = () => {
  const dispatch = useDispatch();
  const spotsObject = useSelector((state) => state.spots.list);
  const spots = Object.values(spotsObject);
  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="home-page">
      <h1>Wordsss</h1>
      <div className="spot-tile-list">
        {spots.map((spot) => (
          <div key={spot.id} className="spot-tile">
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <span>Price: ${spot.price} per night</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
