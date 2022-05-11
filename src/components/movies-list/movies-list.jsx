import React from 'react';
import { connect } from 'react-redux';

import { Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state
  return { visibilityFilter }
}

function MoviesList({ movies, visibilityFilter }) {
  let filteredMovies = movies

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
  }

  if (!movies) return <div className='main-view'/>

  return <>
  <Col md={12} style={{ margin: '1em' }}>
  <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
  </Col>

  {
    filteredMovies.map(movie => (
      <Col md={3} key={movie._id}>
        <MovieCard movie={movie}/>
      </Col>
    ))

  }
  </>

}

export default connect(mapStateToProps) (MoviesList)
