import React from 'react'
import { NavLink,  } from 'react-router-dom'

import { Button, Container, Navbar, Nav } from 'react-bootstrap'

export function Navbar({ user, onLoggedOut }) {
  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else {
      return false
    }
  }

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <NavLink to='/' className='navbar-brand'>MyFlix:</NavLink>
        <Nav>
          {isAuth() && <NavLink to={`/favorites/${user}`} className='nav-link'>Favorites</NavLink>}
          {isAuth() && <NavLink to={`/users/${user}`} className='nav-link'>{user}</NavLink>}
          {isAuth() && (
            <Nav.Link
              onClick={() => {
                onLoggedOut()
              }}
            >
              Logout
            </Nav.Link>
          )}
          {!isAuth() && <NavLink to="/" className='nav-link'>Login</NavLink>}
          {!isAuth() && <NavLink to="/register" className='nav-link'>Sign-up</NavLink>}
        </Nav>
      </Container>
    </Navbar>
  )
}
