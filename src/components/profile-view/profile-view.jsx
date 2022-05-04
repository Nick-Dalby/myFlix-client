import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Button, Card, Row, Col } from 'react-bootstrap';

export function ProfileView({ user, onBackClick }) {
  const [userData, setUserData] = useState({});

  const token = localStorage.getItem('token');

  const getUserData = () => {
    axios
      .get(`https://afternoon-badlands-59179.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUser = () => {
    if (confirm('are you sure?') == true) {
      axios
        .delete(
          `https://afternoon-badlands-59179.herokuapp.com/users/${user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.clear();
          alert('account deleted :(');
          window.open('/', '_self');
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
            <div className="d-flex justify-content-between align-items-baseline">
              <Card.Title>User profile:</Card.Title>
              <Link to={`/users/edit/${user}`}>
                <Button variant="link">edit</Button>
              </Link>
            </div>
            <Card.Text>
              Username: {userData.Username}
              <br />
              Email: {userData.Email}
              <br />
              Birthday:{' '}
              {userData.Birthday
                ? new Date(userData.Birthday).toLocaleDateString('en-CA')
                : ''}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
              <Button variant="danger" onClick={() => deleteUser(user)}>
                Delete account
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
