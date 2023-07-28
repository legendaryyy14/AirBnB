import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchOneSpot } from "../../store/spots";
import Reviews from "../Reviews";


const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    console.log("SPOT ===>", spot)

    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
    }, [dispatch, spotId])



    return (
        <div>
            <h1>{spot?.name}</h1>
            <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            <img className='spotImg' src={`${spot?.previewImage}`} alt='spot_img' />
            <div>
                <h2>Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</h2>
                <p>{spot?.description}</p>
            </div>
            <div className="calloutBox">
                <p>{spot?.price} night</p>
                <i className="fa-solid fa-star"></i>
                <p>{spot?.avgRating}</p>
            </div>
            <div>
                {/* <Reviews /> */}
            </div>
        </div>
    )
};

export default SpotDetail;
