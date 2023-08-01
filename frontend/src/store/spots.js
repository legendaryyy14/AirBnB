const LOAD = "spots/LOAD"
const GET_ONE = "spots/GET_ONE"
const ADD_ONE = "spots/ADD_ONE"
const LOAD_REVIEWS = "spots/LOAD_REVIEWS"
const ADD_IMAGE = "spots/ADD_IMAGE"

const load = list => ({
    type: LOAD,
    list
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
    const res = await fetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
  };

export const fetchOneSpot = (id) => async dispatch => {
    const res = await fetch(`/api/spots/${id}`);
    const spot = await res.json();
    dispatch(getOneSpot(spot))
};

export const createSpot = payload => async (dispatch) => {
  const res = await fetch('/api/spots',{
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
  const res = await fetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
  }
}

export const createSpotImage = (spotId, payload) => async dispatch => {
  const res = await fetch(`/api/spots/${spotId}/images`, {
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

const initialState = {
    list: [],
    reviews: []
  };

  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          list: action.list,
        };
      case GET_ONE:
          const newState = {
            ...state,
          };
          let spots = newState.list.Spots;
          const updatedSpots = spots.map(spot => {
            if (spot.id === action.spot.id) {
              return action.spot
            } else {
              return spot
            }
          });
          console.log(updatedSpots)
          // const spotList = newState.list.Spots.map(id => newState[id]);
          // spotList.push(action.spot);
          // console.log(spotList)
          // newState.list = spotList;
          newState.list.Spots = updatedSpots
          return newState;

      case ADD_ONE:
          return {
            ...state,
            list: {
              ...state.list,
              Spots: [...state.list.Spots, action.spot]
            }
          }

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
