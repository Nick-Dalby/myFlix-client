import React from 'react'
import MovieCard from '../movie-card/movie-card'
import { connect } from 'react-redux'

import { Col } from 'react-bootstrap'

const Favorites = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <Col md={3} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    movies: state.favorites
  }
}

export default connect(mapStateToProps)(Favorites)
