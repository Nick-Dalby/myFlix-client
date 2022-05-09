import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

import MovieCard from '../movie-card/movie-card'


const FavoriteMovies = ({ movies, onBackClick }) => {
  const [movie, setMovie] = useState([])
  const [favMovies, setFavMovies] = useState([])

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  useEffect(() => {
    const getFavorites = () => {
      axios
        .get(`https://afternoon-badlands-59179.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFavMovies(response.data.FavoriteMovies)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getFavorites()
  }, [])

  // filter movies array based on favMovies array
  useEffect(() => {
    const filteredMovies = movies.filter((movie) => {
      if (favMovies.indexOf(movie._id) !== -1) {
        return movie
      }
    })
    setMovie(filteredMovies)
  }, [favMovies])

  console.log(movie)
  return (
    <>
      {/* render each movie in movie array */}
      {movie.map((movie) => {
        return (
        <MovieCard key={movie._id} movie={movie} />
        )
      })}

      <Button variant="secondary" onClick={onBackClick}>
        back
      </Button>
    </>
  )
}

export default FavoriteMovies
