import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="d-grid gap-2">
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary">Open</Button>
            </Link>
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
