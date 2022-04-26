import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
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
                  placeholder="Enter a username"
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" onClick={handleSubmit}>
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
