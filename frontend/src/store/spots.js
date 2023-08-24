import { csrfFetch } from "./csrf";
const LOAD = "spots/LOAD"
const GET_ONE = "spots/GET_ONE"
const ADD_ONE = "spots/ADD_ONE"
const LOAD_REVIEWS = "spots/LOAD_REVIEWS"
const ADD_IMAGE = "spots/ADD_IMAGE"
const ADD_REVIEW = "spots/ADD_REVIEW"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const DELETE_REVIEW = "spots/DELETE_REVIEW"

const load = allSpots => ({
    type: LOAD,
    payload: allSpots
});


const getOneSpot = spot => ({
    type: GET_ONE,
    spot
});

const addSpot = spot => ({
  type: ADD_ONE,
  spot
})

const loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  reviews
})

const addSpotImage = image => ({
  type: ADD_IMAGE,
  image
})

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

const updateSpot = spot => ({
  type: UPDATE_SPOT,
  spot
})

const deleteSpot = spotId => ({
  type: DELETE_SPOT,
  spotId
})

const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
})

export const fetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        dispatch(load(data))
    }
  };

  export const fetchUserSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current');

    if (res.ok) {
        const data = await res.json();
        dispatch(load(data))
    }
  };

export const fetchOneSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`);
    const spot = await res.json();

    if (res.ok) {
      dispatch(getOneSpot(spot))
    }
};

export const createSpot = payload => async (dispatch) => {
  const res = await csrfFetch('/api/spots',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const createdSpot = await res.json();
    dispatch(addSpot(createdSpot))
    return createdSpot
  }
}

export const getReviews = (id) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
  }
}

export const createSpotImage = (spotId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if(res.ok) {
    const createdImage = await res.json();
    dispatch(addSpotImage(createdImage))
    return createdImage
  }

};

export const createReview = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const createdReview = await res.json();
    dispatch(addReview(createdReview));
    return createdReview;
  }
}

export const editSpot = (payload) => async dispatch => {
  const res = await fetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot
  }
}

export const removeSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
};

export const removeReview = reviewId => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) dispatch(deleteReview(reviewId))
}


const initialState = {};

  const spotsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {
      case LOAD:
        newState = {}
        action.payload.Spots.forEach(spot => {
          newState[spot.id] = spot
        });
        return newState;


      case GET_ONE:
        newState[action.spot.id] = action.spot
        return newState;

      case ADD_ONE:
          newState[action.spot.id] = action.spot
          return newState;

      case LOAD_REVIEWS:

            return {
            ...state,
            reviews: action.reviews.Reviews
          };

      case ADD_IMAGE:
        newState[action.image.spotId].image = {
          ...action.image,

        }
        return newState;

      case ADD_REVIEW:
        newState[action.spot.id] = action.spot
        return newState;

      case UPDATE_SPOT:
        newState[action.spot.id] = {
          ...newState[action.spot.id],
          ...action.spot,
        };
        return newState;

      case DELETE_SPOT:
        // const { [action.spotId]: _, ...rest } = newState;
        // return rest;
        console.log(newState)
        newState = {...state};
        delete newState[action.spotId];
        return newState

      case DELETE_REVIEW:
        if (newState.reviews) {
          console.log(newState)
          newState.reviews = newState.reviews.filter(
            (review) => review.id !== action.reviewId
          );
        }
        return newState

      default:
        return state;
    }
  };

  export default spotsReducer;
