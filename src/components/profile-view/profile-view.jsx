import React from 'react';

import axios from 'axios';

import { Row, Col, Container } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';

export function ProfileView({ user, onBackClick, movies, userData }) {
  const deleteUser = () => {
    if (confirm('are you sure?') == true) {
      axios
        .delete(
          `https://afternoon-badlands-59179.herokuapp.com/users/${user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.clear();
          alert('account deleted :(');
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const favMovieList = movies.filter((movie) =>
    userData.FavoriteMovies?.includes(movie._id)
  );

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={9}>
          <UserInfo
            userData={userData}
            onBackClick={onBackClick}
            deleteUser={deleteUser}
          />
        </Col>
      </Row>

      <FavoriteMovies favMovieList={favMovieList} />
    </Container>
  );
}
