import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function FavButton({ userData, movies, movie, user }) {
  const favMovieList = movies.filter((movie) =>
    userData.FavoriteMovies?.includes(movie._id)
  );

  if (favMovieList.includes(movie)) {
    isFav = true;
  } else {
    isFav = false;
  }

  function addToFavorites() {
    const token = localStorage.getItem('token');
    axios
      .post(
        `https://afternoon-badlands-59179.herokuapp.com/users/${user}/movies/${movie._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('added to favorites!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeFromFavorites() {
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://afternoon-badlands-59179.herokuapp.com/users/${user}/movies/${movie._id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('removed from favorites!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {isFav ? (
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            removeFromFavorites();
          }}
        >
          un-Favorite
        </Button>
      ) : (
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            addToFavorites();
          }}
        >
          Favorite
        </Button>
      )}
    </>
  );
}

export default FavButton;
