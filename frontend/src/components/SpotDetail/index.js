import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchOneSpot, getReviews } from "../../store/spots";
import Modal from "react-modal";
import ReviewForm from "../ReviewFormModal";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spots[spotId]);
  const reviewsObject = useSelector((state) => state.spots);
  const reviews = reviewsObject.reviews ? reviewsObject.reviews : [];
  console.log(reviewsObject);

  useEffect(() => {
    dispatch(fetchOneSpot(spotId));
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };



  const formatMonthAndYear = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [showReviewForm, setReviewForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
          Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
        </h2>
        <p>{spot?.description}</p>
      </div>
      <div className="calloutBox">
        <p>{spot?.price} night</p>
        <i className="fa-solid fa-star"></i>
        <p>{spot?.avgRating}</p>
        <button onClick={handleReserveClick}>Reserve</button>

        {reviews && reviews.length > 0 && (
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
          <button
            onClick={() => setReviewForm(true)}
            className="revBtn"
            style={{
              display:
                sessionUser && sessionUser.id !== spot?.Owner?.id
                  ? "block"
                  : "none",
            }}
          >
            Post Your Review
          </button>

          <Modal
            isOpen={showReviewForm}
            onRequestClose={() => setReviewForm(false)}
          >
            <ReviewForm />
          </Modal>
        </div>
        <div>
          {reviews.length === 0 &&
          sessionUser &&
          sessionUser !== spot?.Owner ? (
            <p>Be the first to post a review!</p>
          ) : (
            <ul>
              {reviews
                .slice()
                .reverse()
                .map((review) => (
                  <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{formatMonthAndYear(review.updatedAt)}</p>
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
