import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config'
import { UserContext } from '../contexts/User'
import useStyles from './styles'
const initialFormDetails = {
  email: '',
  password: ''
}
function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [formDetails, setFormDetails] = useState(initialFormDetails)
  const classes = useStyles()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormDetails({
      ...formDetails,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await axiosInstance.post("/auth/login", formDetails)
      if(data?.status === 200) {
        setUser(data.data)
        setFormDetails(initialFormDetails)
        navigate("/")
      } else {
        alert("Login failed, Try again / Check credentials")
      }
    } catch (err) {
      setFormDetails(initialFormDetails)
      alert("Login failed, Try again / Check credentials")
      console.log(err)
    }
  }
  return (
    <Box className={classes.container}>

      <Box className={classes.formContainer}>
        <Typography variant="h6">User Login</Typography>
        <FormControl>
          <TextField
            onChange={handleChange}
            value={formDetails.email}
            name="email"
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
            onChange={handleChange}
            value={formDetails.password}
            name="password"
            label="Password"
            type="password"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <Typography variant="subtitle2">Need to register? Click <Link to="/register">here</Link></Typography>
        <Button onClick={handleSubmit} size="large" variant="contained">Login</Button>
      </Box>
    </Box>
  )
}

export default Login