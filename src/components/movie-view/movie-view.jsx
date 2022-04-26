import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

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

          <Button
            variant="secondary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
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
