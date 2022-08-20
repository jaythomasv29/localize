import React, { useContext, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles';
import { useState } from 'react';
import Details from '../Details/Details';
import { PlacesContext } from '../../contexts/Places';

function List({ places, isLoading }) {
  const { childClicked, rating, type, setType, setRating } = useContext(PlacesContext)
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);



  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places])


  return (
    <div className={classes.container}>
      <Typography variant="h6">Restaurants & Attractions Nearby</Typography>
      {
        isLoading ?
          <div className={classes.loading}>
            <CircularProgress size="3rem" />
          </div> :
      <>
      <Typography variant="body2">Search results: {places?.length} locations</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => { setType(e.target.value) }}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e) => { setRating(e.target.value) }}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>{">= 3.0"}</MenuItem>
            <MenuItem value={4}>{">= 4.0"}</MenuItem>
            <MenuItem value={4.5}>{">= 4.5"}</MenuItem>
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