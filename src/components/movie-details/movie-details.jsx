import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FavButton from '../fav-button/fav-button'

import { Button, Card } from 'react-bootstrap'

const MovieDetails = ({ movie, onBackClick }) => {
  return (
    <Card>
      <Card.Img crossOrigin="anonymous" src={movie.ImagePath} variant="top" />
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
        <Button size="sm" onClick={onBackClick}>
          back
        </Button>
        <FavButton movie={movie} />
      </div>
    </Card>
  )
}

export default MovieDetails

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
}
