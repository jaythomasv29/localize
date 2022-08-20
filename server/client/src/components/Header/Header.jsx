import React from 'react'

import { AppBar, Toolbar, Typography, Box, Button } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { useContext } from 'react'


function Header() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const classes = useStyles()

  const handleLogout = () => {
    setUser(null)
    navigate("/login")
  }

  return (
    <>

      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography onClick={() => navigate("/")} variant="h5" className={classes.title}>
            Localize
          </Typography>
          <Box>
            {
              user ?
                <Button className={classes.displayOnly} color="inherit">{user.username}</Button>
                :
                <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
            }
            <Button onClick={() => navigate("/favorites")} color="inherit"><Favorite /></Button>
            {
              user &&
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header