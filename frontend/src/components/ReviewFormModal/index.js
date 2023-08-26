import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ReviewForm.css'
import { getReviews, createReview } from '../../store/spots';


const ReviewForm = ({setReviewForm}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const reviewsObject = useSelector((state) => state.spots);
  // const reviews = reviewsObject.reviews ? reviewsObject.reviews : []
  const reviews = useSelector((state) => state.spots.reviews ? state.spots.reviews : []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comment.length >= 10 && rating > 0) {

      const payload = {
        userId: sessionUser?.id,
        spotId,
        review: comment,
        stars: rating
      }

      dispatch(createReview(payload))
      console.log('Review submitted:', { comment, rating });

      setReviewForm(false);
      window.location.reload();
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
        <button onClick={() => setReviewForm(false)}>Close</button>
    </div>
  );
};

export default ReviewForm;
