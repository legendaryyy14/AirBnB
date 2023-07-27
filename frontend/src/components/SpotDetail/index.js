import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchOneSpot, getReviews } from "../../store/spots";


const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    const reviews = useSelector(state => state.reviews)
    console.log("SPOT ===>", spot)

    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])



    return (
        <div>
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <img className='spotImg' src={`${spot.previewImage}`} alt='spot_img' />
            <div>
                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                <p>{spot.description}</p>
            </div>
            <div>
                <p>{spot.price} night</p>
                <p>{spot.avgRating}</p>
            </div>
        </div>
    )
};

export default SpotDetail;
