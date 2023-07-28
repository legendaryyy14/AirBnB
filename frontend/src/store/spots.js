const LOAD = "spots/LOAD"
const ADD_ONE = "spots/ADD_ONE"
const LOAD_REVIEWS = "spots/LOAD_REVIEWS"

const load = list => ({
    type: LOAD,
    list
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
});

const loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  reviews
});

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
    dispatch(addOneSpot(spot))
}

export const getReviews = (id) => async dispatch => {
  const res = await fetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
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
      case ADD_ONE:

          const newState = {
            ...state,
            [action.spot.id]: action.spot
          };
          const spotList = newState.list.map(id => newState[id]);
          spotList.push(action.spot);
          newState.list = spotList;
          return newState;

          case LOAD_REVIEWS:
            return {
            ...state,
            reviews: action.reviews
          };
      default:
        return state;
    }
  };

  export default spotsReducer;
