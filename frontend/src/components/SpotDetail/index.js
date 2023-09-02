import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchOneSpot, getReviews, removeReview } from "../../store/spots";
import Modal from "react-modal";
import ReviewForm from "../ReviewFormModal";
import "./SpotDetail.css"

const SpotDetail = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.spots.reviews ? state.spots.reviews : []);

  const previewImage = spot?.SpotImages && spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;


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
      await dispatch(removeReview(reviewToDelete));
      setShowDeleteModal(false);
      setReviewToDelete(null);
      await dispatch(getReviews(spotId));
    }
  };

  const userReviewed = reviews?.some(review => review?.User?.id === sessionUser?.id);
// const userReviewed = false
  return (
    <div className="container">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic" rel="stylesheet" />

      <h1>{spot?.name}</h1>
      <p id="spot-deets">
        {spot?.city}, {spot?.state}, {spot?.country}
      </p>

      <div className="image-section">
      <img className="prev-img" src={`${previewImage}`} alt="spot_img" />
                <div className="image-columns">
                  {spot?.SpotImages?.slice(1).map((image) => (
                    <img className="other-img" src={`${image?.url}`} alt='other-img' key={image?.id}/>
                  ))}
                </div>
      </div>

      <div className="middle-section">
        <div>
        <h2 >
          Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
        </h2>
        <p>{spot?.description}</p>

        </div>
      <div className="calloutBox">
        <div className="top-sec">
        <p>${spot?.price} night</p>
        <i className="fa-solid fa-star"></i>
        <p>{spot?.avgRating}</p>
        {reviews && reviews?.length && (
          <>
            <p className="dot">·</p>
            <p>
              {reviews.length === 1
                ? `${reviews?.length} review`
                : `${reviews?.length} reviews`}
            </p>
          </>
        )}
        </div>

        <button onClick={handleReserveClick}>Reserve</button>
      </div>

      </div>
      <div className="reviews">
        <div className="top-sec" id="top-of-revs">

        <i className="fa-solid fa-star"></i>
        <p>{spot?.avgRating}</p>
        {reviews?.length && (
          <>
            <p className="dot">·</p>
            <p>
              {reviews?.length === 1
                ? `${reviews?.length} review`
                : `${reviews?.length} reviews`}
            </p>
          </>
        )}
        </div>
        <div id="post-review">
          {
            userReviewed ? (
              <p id="already-posted">You've already posted a review for this spot.</p>
            ) : (

          <button
            onClick={() => setReviewForm(true)}
            className="revBtn"
            style={{
              display:
                sessionUser && sessionUser?.id !== spot?.Owner?.id
                  ? "block"
                  : "none",
                }}
          >
            Post Your Review
          </button>
            )
          }

          <Modal
            isOpen={showReviewForm}
            onRequestClose={() => setReviewForm(false)}
            className="review-modal"
          >
            <ReviewForm setReviewForm={setReviewForm}/>
          </Modal>
        </div>
        <div>
          {!reviews?.length &&
          sessionUser &&
          sessionUser !== spot?.Owner ? (
            <p>Be the first to post a review!</p>
          ) : (
            <div>
              {reviews
                .slice()
                .reverse()
                .map((review) => (
                  <div className="individual-review" key={review?.id}>
                    <p id="first-name">{review?.User?.firstName}</p>
                    <p id="date">{formatMonthAndYear(review?.updatedAt)}</p>
                    <p id="review">{review?.review}</p>
                    {sessionUser && sessionUser?.id === review?.User?.id && (
                    <button className="first-delete-button" onClick={() => handleDeleteReview(review?.id)}>Delete</button>
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
        className="rev-delete-modal"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className="modal-buttons">
        <button onClick={handleConfirmDelete} className="delete-button">
          Yes (Delete Review)
        </button>
        <button onClick={() => setShowDeleteModal(false)} className="cancel-button">
          No (Keep Review)
        </button>

        </div>
      </Modal>
      </div>
    </div>
  );
};

export default SpotDetail;
