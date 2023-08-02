import { csrfFetch } from "./csrf";
const LOAD = "spots/LOAD"
const GET_ONE = "spots/GET_ONE"
const ADD_ONE = "spots/ADD_ONE"
const LOAD_REVIEWS = "spots/LOAD_REVIEWS"
const ADD_IMAGE = "spots/ADD_IMAGE"

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

export const fetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

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
        return newState


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
      default:
        return state;
    }
  };

  export default spotsReducer;
