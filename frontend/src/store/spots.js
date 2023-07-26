const LOAD = "spots/LOAD"
const ADD_ONE = "spots/ADD_ONE"

const load = list => ({
    type: LOAD,
    list
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
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
    dispatch(addOneSpot(spot))
}


const initialState = {
    list: [],
  };

  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          list: action.list,
        };
      case ADD_ONE:
        return {
            ...state,
            list: [...state.list, action.spot]
        }
      default:
        return state;
    }
  };

  export default spotsReducer;
