import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  addToFavorites(user, movie) {
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

  render() {
    const { movie, onBackClick, user } = this.props;

    return (
      <Card className="movie-view">
        <Card.Img crossOrigin="anonymous" src={movie.ImagePath} variant="top" />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div>
            Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link"> {movie.Director.Name}</Button>
            </Link>
          </div>
          <div>
            Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={() => this.addToFavorites(user, movie)}
            >
              Add to favorites
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};
