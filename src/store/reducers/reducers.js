import { combineReducers } from 'redux'

import { SET_FILTER, SET_MOVIES, SET_USERDATA } from '../actions/actions'

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

function userData(state = [], action) {
  switch (action.type) {
    case SET_USERDATA:
      return action.value
    default:
      return state
  }
}




// combined reducer:
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//   }
// }

const rootReducer = combineReducers({
  visibilityFilter,
  movies,
  userData
})

export default rootReducer
