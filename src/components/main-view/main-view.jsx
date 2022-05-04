import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';

import './main-view.scss';

import { Navbar } from '../nav-bar/nav-bar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://afternoon-badlands-59179.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((movie) => (
                  <Col md={3} key={movie._id}>
                    <MovieCard movie={movie} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return <RegistrationView />;
              }}
            ></Route>

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />; //doesnt seem to work!
                return (
                  <ProfileView
                    user={user}
                    onLoggedIn={this.onLoggedIn}
                    onBackClick={() => history.goBack()}
                  />
                );
              }}
            ></Route>

            <Route
              path={`/users/edit/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />; //doesnt seem to work!
                return (
                  <ProfileEdit
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                );
              }}
            ></Route>

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  );
                if (movies.length === 0) return <div className="main-view" />;
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
                );
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
                  );

                if (movies.length === 0) return <div className="main-view" />;
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
                );
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
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={5}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView;
