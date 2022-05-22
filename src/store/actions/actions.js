// action types:
export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const SET_USERDATA = 'SET_USERDATA'
export const SET_FAVORITES = 'SET_FAVORITES'



// action creators:
export const setMovies = (value) => ({
   type: SET_MOVIES, 
   value 
})

export const setFilter = (value) => ({
   type: SET_FILTER,
   value
})

export const setFavorites = (value) => ({
   type: SET_FAVORITES,
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

export const setUserData = (value) => ({
   type: SET_USERDATA,
   value
})
