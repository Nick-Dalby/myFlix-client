import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Button
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
