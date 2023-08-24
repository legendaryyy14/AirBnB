import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ReviewForm.css'
import { getReviews, createReview } from '../../store/spots';


const ReviewForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const reviewsObject = useSelector((state) => state.spots);
  const reviews = reviewsObject.reviews ? reviewsObject.reviews : []
  console.log(reviews);

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.length >= 10 && rating > 0) {

      const payload = {
        userId: sessionUser.id,
        spotId,
        review: comment,
        stars: rating
      }

      let createdReview = dispatch(createReview(payload))
      console.log('Review submitted:', { comment, rating });
      // Close the modal
      setModalIsOpen(false);
    }
  };

  return (
    <div>
        <h2>How was your stay?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={comment}
            onChange={handleCommentChange}
          />
<div>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
              <span
              key={value}
              className={`star ${value <= rating ? 'filled' : 'empty'}`}
              onClick={() => handleRatingChange({ target: { value } })}
            >
              ★
            </span>
          ))}
          Stars
        </div>
      </div>
          <button type="submit" disabled={comment.length < 10 || rating === 0}>
            Submit Your Review
          </button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
    </div>
  );
};

export default ReviewForm;
