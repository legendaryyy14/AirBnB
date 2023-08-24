import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchOneSpot, getReviews, removeReview } from "../../store/spots";
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

  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (reviewToDelete) {
      console.log(reviews)
      await dispatch(removeReview(reviewToDelete));
      setShowDeleteModal(false);
      setReviewToDelete(null);
      dispatch(getReviews(spotId));
    }
  };

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
            <div>
              {reviews
                .slice()
                .reverse()
                .map((review) => (
                  <div key={review.id}>
                    <p>{review.User.firstName}</p>
                    <p>{formatMonthAndYear(review.updatedAt)}</p>
                    <p>{review.review}</p>
                    {sessionUser && sessionUser.id === review.User.id && (
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  )}
                  </div>
                ))}
            </div>

          )}
        </div>
        <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={handleConfirmDelete} className="delete-button">
          Yes (Delete Review)
        </button>
        <button onClick={() => setShowDeleteModal(false)} className="cancel-button">
          No (Keep Review)
        </button>
      </Modal>
      </div>
    </div>
  );
};

export default SpotDetail;
