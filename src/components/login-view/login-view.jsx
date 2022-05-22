import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'



import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameErr, setUsernameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')



  const validate = () => {
    let isReq = true
    if (!username) {
      setUsernameErr('Username required')
      isReq = false
    } else if (username.length < 2) {
      setUsernameErr('Username must be two characters or more')
      isReq = false
    }
    if (!password) {
      setPasswordErr('Password required')
      isReq = false
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters')
      isReq = false
    }
    return isReq
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isReq = validate();
    axios
      .post('https://afternoon-badlands-59179.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data
        onLoggedIn(data)

       
      })
      .catch((e) => {
        console.log('no such user')
      })
  }

  return (
    <Row className="main-view justify-content-md-center">
      <Col md={8}>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameErr && <p className="error">{usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordErr && <p className="error">{passwordErr}</p>}
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
                <Button href="/register" variant="secondary" type="submit">
                  Sign-up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginView

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
}
