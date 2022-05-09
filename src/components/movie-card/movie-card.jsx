import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'
import FavButton from '../fav-button/fav-button'

import './movie-card.scss'

import { Button } from 'react-bootstrap'

const MovieCard = ({ movie }) => {
  
  return (

          <Card>
            <Card.Img src={movie.ImagePath} crossOrigin="anonymous" />
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              <Link to={`/movies/${movie._id}`}>
              <Button size="sm">
                open
              </Button>
              </Link>
              <FavButton movie={movie}/>
            </div>
          </Card>

  )
}

export default MovieCard
