import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card, Row, Col, Form } from 'react-bootstrap';

export function ProfileEdit({ user, onBackClick }) {
  const [userData, setUserData] = useState({});
  const [passwordErr, setPasswordErr] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`https://afternoon-badlands-59179.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData({ ...response.data, Password: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const formatedDOB = userData.Birthday
    ? new Date(userData.Birthday).toLocaleDateString('en-CA')
    : '';

  const validate = () => {
    let isReq = true;

    if (!userData.Password) {
      setPasswordErr('please update password');
      isReq = false;
    } else if (userData.Password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    return isReq;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://afternoon-badlands-59179.herokuapp.com/users/${user}`,
          {
            Username: userData.Username,
            Password: userData.Password,
            Email: userData.Email,
            Birthday: formatedDOB,
          },
          {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert('account updated');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={10}>
        <Card>
          <Card.Body>
            <Form>
              <h3>Update user profile:</h3>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  defaultValue={userData.Username}
                  onChange={(e) => handleChange(e)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="Password"
                  placeholder="update password"
                  onChange={(e) => handleChange(e)}
                ></Form.Control>
                {passwordErr && <p className="error">{passwordErr}</p>}
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  defaultValue={userData.Email}
                  onChange={(e) => handleChange(e)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                  type="date"
                  name="Birthday"
                  defaultValue={formatedDOB}
                  onChange={(e) => handleChange(e)}
                ></Form.Control>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
                <Button type="submit" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

ProfileEdit.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
