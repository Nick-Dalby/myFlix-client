import React from 'react'
import MovieCard from '../movie-card/movie-card'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

const Favorites = ({ favorites }) => {
  return (
    <>
      {favorites.map((movie) => (
        <Col md={3} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  }
}

export default connect(mapStateToProps)(Favorites)
