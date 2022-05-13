import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import MovieCard from '../movie-card/movie-card'


const Favorites = ({ movies, userData }) => {
  let movieList = movies
  let favMovies = userData.FavoriteMovies

  let movie = movieList.filter((movie) => {
    if (favMovies.indexOf(movie._id) !== -1) {
      return movie
    }
  })

  return (
    <>
      {movie.map((movie) => {
        return <MovieCard movie={movie} key={movie._id} />
      })}
    </>
  )
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    userData: state.userData,
  }
}

export default connect(mapStateToProps)(Favorites)
