import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Row, Col, Card } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Row className="main-view justify-content-md-center">
      <Col md={5}>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>{' '}
              <Button variant="secondary" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
