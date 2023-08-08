import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots } from "../../store/spots"
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";



const ManageSpots = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory()
    const spotsObject = useSelector((state) => state.spots);
    const spots = Object.values(spotsObject)



    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    console.log(spots)
    const getRatingOrNew = (avgRating) => {
        return avgRating ? avgRating : "New";
    };

    const handleUpdateClick = (spotId) => {
        history.push(`/spots/${spotId}/update`);
    };

    return (
        <div>
            <h1>Manage Spots</h1>
            <div>
                {!spots ? (
                    <NavLink to='/spots'>Create a New Spot</NavLink>
                ) : (
                    spots.map((spot) => (
                        <div>
                            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                                <img className="previmg" src={`${spot.previewImage}`} alt='prev_img' title={`${spot.name}`} />
                                <p>{`${spot.city}, ${spot.state}`}</p>
                                <p>{getRatingOrNew(spot.avgRating)}</p> {/* Assuming getRatingOrNew is defined */}
                                <p>${spot.price} night</p>
                            </NavLink>

                                <button onClick={() => handleUpdateClick(spot.id)}>Update</button>
                                <button>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ManageSpots;
