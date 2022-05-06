import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';
import FavButton from '../fav-toggle/fav-toggle';

export class MovieCard extends React.Component {
  render() {
    const { movie, userData, movies, user } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <div className="d-flex justify-content-between">
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary" size="sm">
                Open
              </Button>
            </Link>
            <FavButton
              userData={userData}
              movies={movies}
              movie={movie}
              user={user}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
