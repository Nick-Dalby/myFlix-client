import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Row, Col, Container, Button } from 'react-bootstrap'

import UserInfo from './user-info'

export function ProfileView({ onBackClick }) {
  const [userData, setUserData] = useState([])
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  useEffect(() => {
    const getUserData = () => {
      axios
        .get(`https://afternoon-badlands-59179.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getUserData()
  }, [])

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
          localStorage.clear()
          alert('account deleted :(')
          window.open('/', '_self')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={9}>
          <UserInfo userData={userData} deleteUser={deleteUser} />

          <Button onClick={onBackClick}>back</Button>
        </Col>
      </Row>
    </Container>
  )
}
