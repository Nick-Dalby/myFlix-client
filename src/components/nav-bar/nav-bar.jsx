import React from 'react';

import { Button, Container, Navbar, Nav  } from 'react-bootstrap';

export function Navbar({ user, onLoggedOut }) {


  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">MyFlix:</Navbar.Brand>
        <Nav>
        <Nav.Link href={`/favorites/${user}`}>Favorites</Nav.Link>
          {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
          {isAuth() && (
       
            
            <Button
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          
          )}
          {!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
