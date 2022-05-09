import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from 'react-bootstrap'

const FavButton = ({ movie }) => {
  const [favMovies, setFavMovies] = useState([])
  const [isFav, setIsFav] = useState(false)

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  // get array of users favorite movies
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
  }, [isFav])



  // if movie._id exists in users (favMovies) then set a boolean for that movie._id to true
  useEffect(() => {
    if (favMovies.indexOf(movie._id) !== -1) {
      setIsFav(true)
    }
  }, [favMovies])

  // post request to api endpoint then set state of isFav to true
  function addToFavorites() {
    axios
      .post(
        `https://afternoon-badlands-59179.herokuapp.com/users/${user}/movies/${movie._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log('added')
        setIsFav(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // delete request to api endpoint then set state of isFav to false
  function removeFromFavorites() {
    axios
      .delete(
        `https://afternoon-badlands-59179.herokuapp.com/users/${user}/movies/${movie._id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log('removed')
        setIsFav(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <>
      {isFav ? (
        <Button
          size="sm"
          variant='warning'
          onClick={() => {
            removeFromFavorites()
          }}
        >
          un-fav
        </Button>
      ) : (
        <Button
          size="sm"
          variant='success'
          onClick={() => {
            addToFavorites()
          }}
        >
          fav
        </Button>
      )}
    </>
  )
}

export default FavButton
