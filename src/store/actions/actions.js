// action types:
export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'



// action creators:
export const setMovies = (value) => ({
   type: SET_MOVIES, 
   value 
})

export const setFilter = (value) => ({
   type: SET_FILTER,
   value
})

export const addFavorite = (movie) => ({
   type: ADD_FAVORITE,
   movie
})

export const removeFavorite = (movie) => ({
   type: REMOVE_FAVORITE,
   payload: movie
})
