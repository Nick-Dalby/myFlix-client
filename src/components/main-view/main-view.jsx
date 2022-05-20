import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setMovies } from '../../store/actions/actions'

import { Container, Row, Col } from 'react-bootstrap'

import MoviesList from '../movies-list/movies-list'

import { Navbar } from '../nav-bar/nav-bar'
import LoginView from '../login-view/login-view'
import MovieDetails from '../movie-details/movie-details'
import { RegistrationView } from '../registration-view/registration-view'
import { ProfileView } from '../profile-view/profile-view'
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view'
import { ProfileEdit } from '../profile-view/profile-edit'

import Favorites from '../favorites/favorites'

class MainView extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    })

    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', authData.user.Username)
    this.getMovies(authData.token)
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token')

    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      })
      this.getMovies(accessToken)
    }
  }

  getMovies(token) {
    axios
      .get('https://afternoon-badlands-59179.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    const { movies } = this.props
    const { user } = this.state

    const onLoggedOut = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.setState({
        user: null,
      })
    }

    return (
      <Router>
        <Navbar user={user} onLoggedOut={() => onLoggedOut()} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  )
                if (movies.length === 0) return <div className="main-view" />
                return <MoviesList movies={movies} />
              }}
            />
          </Row>

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />
              return <RegistrationView />
            }}
          />

          <Route
            path={`/users/:user`}
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                )
              if (movies.length === 0) return <div className="main-view" />
              return (
                <ProfileView
                  movies={movies}
                  onLoggedIn={this.onLoggedIn}
                  onBackClick={() => history.goBack()}
                />
              )
            }}
          />
          <Row className="justify-content-md-center">
            <Route
              path={`/favorites/:user`}
              render={({ history }) => {
                if (!user)
                  return (
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  )
                if (movies.length === 0) return <div className="main-view" />
                return <Favorites onBackClick={() => history.goBack()} />
              }}
            />
          </Row>

          <Route
            path={`/edit/:user`}
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                )
              if (movies.length === 0) return <div className="main-view" />
              return (
                <Col md={5}>
                  <ProfileEdit onBackClick={() => history.goBack()} />
                </Col>
              )
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                )
              if (movies.length === 0) return <div className="main-view" />
              return (
                <Col md={5}>
                  <GenreView
                    genre={
                      movies.find(
                        (movie) => movie.Genre.Name === match.params.name
                      ).Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              )
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                )
              if (movies.length === 0) return <div className="main-view" />
              return (
                <Col md={5}>
                  <DirectorView
                    director={
                      movies.find(
                        (movie) => movie.Director.Name === match.params.name
                      ).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              )
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                )
              if (movies.length === 0) return <div className="main-view" />
              return (
                <Row className="main-view justify-content-md-center">
                  <Col md={5} xs={12}>
                    <MovieDetails
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                </Row>
              )
            }}
          />
        </Container>
      </Router>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
  }
}

export default connect(mapStateToProps, { setMovies })(MainView)
