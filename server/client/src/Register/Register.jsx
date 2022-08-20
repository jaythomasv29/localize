import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import axios from 'axios'
import { UserContext } from '../contexts/User'
import { axiosInstance } from '../config'


const defaultForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}


function Register() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [formDetails, setFormDetails] = useState(defaultForm)
  const classes = useStyles()

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormDetails({
      ...formDetails,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...registrationDetails } = formDetails
    if (formDetails.password !== confirmPassword) return
    try {
      const serverResponse = await axiosInstance.post("/auth/register", registrationDetails)
      if(serverResponse.status === 200){
        setUser(registrationDetails)
        setFormDetails(defaultForm)
        navigate("/")
        
      } else {
        alert("Registration Failed. Try again")
      }

    } catch (err) {
      setFormDetails(defaultForm)
      alert("Registration Failed. Try again")
      console.log(err)
    }



  }

  return (



    <Box className={classes.container}>

      <Box className={classes.formContainer}>
        <Typography variant="h6">User Registration</Typography>
        <FormControl>
          <TextField
            onChange={handleFormChange}
            name="username"
            value={formDetails.username}
            label="Username"
            type="text"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl >
          <TextField
            onChange={handleFormChange}
            name="email"
            value={formDetails.email}
            label="Email"
            type="text"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            onChange={handleFormChange}
            name="password"
            value={formDetails.password}
            label="Password"
            type="password"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            onChange={handleFormChange}
            name="confirmPassword"
            value={formDetails.confirmPassword}
            label="Confirm Password"
            type="password"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <Typography variant="subtitle2">Already have an account? Click <Link to="/login">here</Link></Typography>
        <Button onClick={handleSubmit} size="large" variant="contained">Login</Button>
      </Box>
    </Box>

  )
}

export default Register