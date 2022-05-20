import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../store/actions/actions'

import { Button } from 'react-bootstrap'

const FavButton = ({ movie }) => {
  //need to get the fav list from api and add to initial state rather than this...
  const [isFav, setIsFav] = useState(false) 

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  const dispatch = useDispatch()

  // post request to api endpoint then set state of isFav to true
  // then dispatch add favorite action to reducer
  function addToFavorites(movie) {
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
        dispatch(addFavorite(movie))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // delete request to api endpoint then set state of isFav to false
  // then dispatch remove favorite action to reducer
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
        dispatch(removeFavorite(movie))
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
          variant="warning"
          onClick={() => {
            removeFromFavorites(movie)
          }}
        >
          un-fav
        </Button>
      ) : (
        <Button
          size="sm"
          variant="success"
          onClick={() => {
            addToFavorites(movie)
          }}
        >
          fav
        </Button>
      )}
    </>
  )
}

export default FavButton
