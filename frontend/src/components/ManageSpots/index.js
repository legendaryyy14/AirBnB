import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots } from "../../store/spots"
import { useEffect } from "react";


const ManageSpots = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots)

    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    console.log(spots)

    return (
        <div>
            {

            }
        </div>
    )
}

export default ManageSpots;
