import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

import axios from 'axios';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // validating inputs

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be two characters or more');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please enter an email address');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Invalid email address');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://afternoon-badlands-59179.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successfull, please login!');
          window.open('/', '_self');
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  return (
    <Row className="main-view justify-content-md-center">
      <Col md={5}>
        <Card>
          <Card.Body>
            <Form>
              <h3>Sign up:</h3>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
                {usernameErr && <p className="error">{usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                {passwordErr && <p className="error">{passwordErr}</p>}
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                {emailErr && <p className="error">{emailErr}</p>}
              </Form.Group>
              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date of birth"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" onClick={handleSubmit}>
                Register
              </Button>{' '}
              <Button variant="secondary" type="submit" href="/">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
  }),
};
