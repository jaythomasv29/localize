import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core'
import { Rating } from '@mui/material'
import { useContext } from 'react'
import { PlacesContext } from '../contexts/Places'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import useStyles from './styles'

function Favorites() {
  const classes = useStyles()
  const { favoritePlaces } = useContext(PlacesContext) 

  return (
    <Box className={classes.page}>
      <div className={classes.wrapper}>
      
      {
        favoritePlaces?.map(({ description, _id }) => {
          return (<Card key={_id} elevation={6} className={classes.container}>
            <CardMedia style={{ height: 200 }} image={description.photo ? description.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
              title={description.name}
            />

            <CardContent>

              <Typography variant="h6">{description.name}</Typography>
              <Typography gutterBottom variant="body2" color="textSecondary"><LocationOnIcon />{description?.address}</Typography>
              <Typography gutterBottom variant="body2" color="textSecondary"><PhoneIcon />{description?.phone}</Typography>


              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Price</Typography>
                <Typography gutterBottom variant="subtitle3">{description?.price_level}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Average Rating</Typography>
                <Chip size="small" label={description.rating} />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Overall Score</Typography>
                <Rating value={Number(description.rating)} precsion={0.5} readOnly size="small" />
              </Box>
              {
                description?.cuisine?.map((cuisine) => (
                  <Chip key={cuisine.key} size="small" label={cuisine.name} className={classes.chip} />
                ))
              }
              {
                description?.awards?.map((award, idx) => {
                  if (idx < 1) {
                    return <Box my={1} display="flex" gridGap={5} alignItems="center">
                      <img src={award.images.small} alt={award.display_name} />
                      <Typography variant="body2" color="textSecondary">{award?.display_name}</Typography>
                    </Box>
                  }
                })
              }
              <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(description?.web_url, '_blank')}>Trip Advisor</Button>
                <Button size="small" color="primary" onClick={() => window.open(description?.website, '_blank')}>Website</Button>
              </CardActions>
            </CardContent>
          </Card>)
        })
      }
      </div>
    </Box>

  )
}

export default Favorites