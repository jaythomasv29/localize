import React, { useContext, useEffect, createRef, useRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles';
import { useState } from 'react';
import Details from '../Details/Details';
import { PlacesContext } from '../../contexts/Places';
import { RefreshSharp } from '@mui/icons-material';

function List({ places, isLoading }) {
  const { childClicked } = useContext(PlacesContext)
  const classes = useStyles();
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("0");

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places])


  return (
    <div className={classes.container}>
      <Typography variant="h6">Restaurants, Hotels, & Attractions Nearby</Typography>
      {
        isLoading ?
          <div className={classes.loading}>
            <CircularProgress size="3rem" />
          </div> :
      <>
        <FormControl className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => { setType(e.target.value) }}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e) => { setRating(e.target.value) }}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
          {
            places?.map((place, idx) => {
             
              return <Grid ref={elRefs[idx]} item key={idx} xs={12}>
                <Details
                  place={place}
                  selected={Number(childClicked) === idx}
                  refProp={elRefs[idx]} 
                />
              </Grid>
              
            })
          }
        </Grid>
      </>
      }
    </div>
  )
}

export default List