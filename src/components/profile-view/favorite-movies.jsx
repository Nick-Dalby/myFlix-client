import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMovies({ favMovieList }) {
  return (
    <Row className="justify-content-md-center">
      {favMovieList.map((movie) => (
        <Col xs={6} md={3} key={movie._id}>
          <Card>
            <Card.Img
              variant="top"
              src={movie.ImagePath}
              crossOrigin="anonymous"
            />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>

              <div className="d-flex gap-2 justify-content-between">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="primary" size="sm">
                    Open
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default FavoriteMovies;
