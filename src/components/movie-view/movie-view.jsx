import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import FavButton from '../fav-toggle/fav-toggle';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

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
