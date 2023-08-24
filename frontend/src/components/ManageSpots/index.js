import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots, removeSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Modal from "react-modal";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const spotsObject = useSelector((state) => state.spots);
  const spots = Object.values(spotsObject);

  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);

  const getRatingOrNew = (avgRating) => {
    return avgRating ? avgRating : "New";
  };

  const handleUpdateClick = (spotId) => {
    history.push(`/spots/${spotId}/update`);
  };

  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (spotId) => {
    setSelectedSpotId(spotId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeSpot(selectedSpotId));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedSpotId(null);
    setShowDeleteModal(false);
  };
  console.log(spots);

  return (
    <div>
      <h1>Manage Spots</h1>
      <div>
        {!spots ? (
          <NavLink to="/spots">Create a New Spot</NavLink>
        ) : (
          <div>
            {spots.map((spot) => (
              <div>
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                  <img
                    className="previmg"
                    src={`${spot.previewImage}`}
                    alt="prev_img"
                    title={`${spot.name}`}
                  />
                  <p>{`${spot.city}, ${spot.state}`}</p>
                  <p>{getRatingOrNew(spot.avgRating)}</p>{" "}
                  <p>${spot.price} night</p>
                </NavLink>

                <button onClick={() => handleUpdateClick(spot.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteClick(spot.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={handleCancelDelete}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Confirm Delete</h2>
          <p className="modal-message">
            Are you sure you want to remove this spot?
          </p>
          <div className="modal-buttons">
            <button
              className="modal-button delete-button"
              onClick={handleConfirmDelete}
            >
              Yes (Delete Spot)
            </button>
            <button
              className="modal-button cancel-button"
              onClick={handleCancelDelete}
            >
              No (Keep Spot)
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ManageSpots;
