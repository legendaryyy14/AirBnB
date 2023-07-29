import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchOneSpot, getReviews } from "../../store/spots";
import * as sessionActions from "../../store/session";

const SpotDetail = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(fetchOneSpot(spotId));
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  const spots = useSelector((state) => state.spots.list.Spots);
  const reviews = useSelector((state) => state.spots.reviews);
  const spot = spots.find((spot) => spot.id === Number(spotId));

  console.log("CONSOLE LOG ===>", reviews);

  return (
    <div>
      <h1>{spot?.name}</h1>
      <p>
        {spot?.city}, {spot?.state}, {spot?.country}
      </p>
      <img className="spotImg" src={`${spot?.previewImage}`} alt="spot_img" />
      <div>
        <h2>
          Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}
        </h2>
        <p>{spot?.description}</p>
      </div>
      <div className="calloutBox">
        <p>{spot?.price} night</p>
        <i className="fa-solid fa-star"></i>
        <p>{spot?.avgRating}</p>
        {reviews.length > 0 && (
          <>
            <p className="dot">·</p>
            <p>
              {reviews.length === 1
                ? `${reviews.length} review`
                : `${reviews.length} reviews`}
            </p>
          </>
        )}
      </div>
      <div className="reviews">
        <i className="fa-solid fa-star"></i>
        <p>{spot?.avgRating}</p>
        {reviews.length > 0 && (
          <>
            <p className="dot">·</p>
            <p>
              {reviews.length === 1
                ? `${reviews.length} review`
                : `${reviews.length} reviews`}
            </p>
          </>
        )}
        <div>
          {reviews.length === 0 && sessionUser ? (
            <p>Be the first to post a review!</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <div key={review.id}>
                  <p>{review.User.firstName}</p>
                  <p>{review.updatedAt}</p>
                  <p>{review.review}</p>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;