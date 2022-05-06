import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function UserInfo({ userData, onBackClick, deleteUser }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-baseline">
          <Card.Title>User profile:</Card.Title>
          <Link to={`/users/edit/${userData.Username}`}>
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
          <Button
            variant="danger"
            onClick={() => deleteUser(userData.Username)}
          >
            Delete account
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserInfo;
