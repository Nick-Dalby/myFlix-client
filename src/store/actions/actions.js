// action types:
export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'

// action creators:
export const setMovies = (value) => ({
   type: SET_MOVIES, 
   value 
})

export const setFilter = (value) => ({
   type: SET_FILTER,
   value
})

