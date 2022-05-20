import { combineReducers } from 'redux'

import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FILTER, SET_MOVIES } from '../actions/actions'

// reducers:
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value
    default:
      return state
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value
    default:
      return state
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.movie]
    case REMOVE_FAVORITE:
      return state.filter(movie => movie._id !== action.payload._id)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  visibilityFilter,
  movies,
  favorites
})

export default rootReducer
