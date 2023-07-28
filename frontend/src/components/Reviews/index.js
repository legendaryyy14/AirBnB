import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/spots";
import { useParams } from "react-router-dom";

const Reviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviewsObject = useSelector((state) => state.reviews);
    const reviews = Object.values(reviewsObject);

    console.log("REVIEWS =====>", reviews);

    useEffect(() => {
        dispatch(getReviews(spotId));
    }, [dispatch, spotId])

    return (
        <div className="reviews">
            <h1>REVIEWS</h1>
        </div>
    )
}


export default Reviews;
