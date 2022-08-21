import React, { useContext } from 'react'

import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import useStyles from './styles'
import { PlacesContext } from '../../contexts/Places';
import { Rating } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../contexts/User';
import { FavoriteRounded } from '@material-ui/icons';
// import { axiosInstance } from '../../config';

function Details({ place, selected, refProp }) {
  const { favoritePlaces, setFavoritePlaces } = useContext(PlacesContext)
  const { user } = useContext(UserContext)
  const classes = useStyles()
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const addToFavorites = async () => {
    if (favoritePlaces.find(item => item.description.location_id === place.location_id)) return alert("Already saved in favorites...")
    try {
      const savedPlace = await axios.post("https://my-localize-app.herokuapp.com/api/location", { username: user.username, description: JSON.stringify(place) })
      const fetchLocationData = async () => {
        try {
          const response = await axios.get("https://my-localize-app.herokuapp.com/api/location")
          const parsedPlaces = response.data.map(place => {
            return {...place, description: JSON.parse(place.description)}
          })
          setFavoritePlaces(parsedPlaces)
        } catch (err) {
          console.log(err)
        }
      }
      alert("Favorite place added")
      fetchLocationData()

    } catch (err) {
      alert("Error adding to favorites...")
    }
  }
  return (

    <Card elevation={6} className={classes.container}>
      <CardMedia style={{ height: 200 }} image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      {
      favoritePlaces?.find(item => item.description.location_id === place.location_id) ?
        <FavoriteRounded className={classes.alreadyLiked}/>
        :
          <FavoriteBorderIcon onClick={addToFavorites} className={classes.likeIcon} />
      }
      <CardContent>

        <Typography variant="h6">{place.name}</Typography>
        <Typography gutterBottom variant="body2" color="textSecondary"><LocationOnIcon />{place?.address}</Typography>
        <Typography gutterBottom variant="body2" color="textSecondary"><PhoneIcon />{place?.phone}</Typography>


        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle3">{place?.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Average Rating</Typography>
          <Chip size="small" label={place.rating} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Overall Score</Typography>
          <Rating value={Number(place.rating)} precsion={0.5} readOnly size="small" />
        </Box>
        {
          place?.cuisine?.map((cuisine) => (
            <Chip key={cuisine.key} size="small" label={cuisine.name} className={classes.chip} />
          ))
        }
        {
          place?.awards?.map((award, idx) => {
            if (idx < 1) {
              return <Box my={1} display="flex" gridGap={5} alignItems="center">
                <img src={award.images.small} alt={award.display_name} />
                <Typography variant="body2" color="textSecondary">{award?.display_name}</Typography>
              </Box>
            }
          })
        }
        <CardActions>
          <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>Trip Advisor</Button>
          <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>Website</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default Details