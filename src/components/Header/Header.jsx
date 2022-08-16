import React from 'react'

import { AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import useStyles from './styles'
import { Autocomplete } from '@react-google-maps/api'
function Header() {
  const classes = useStyles()
  return (
    <>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Hot Spot
        </Typography>
        <Box display="flex">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchOutlined />
                </div>
                <InputBase placeholder="Explore new places..." classes={{ root: classes.inputRoot, input: classes.inputInput}} />
              </div>
            {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Header