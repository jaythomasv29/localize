import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react';
import { Chip } from '@material-ui/core'

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import useStyles from './styles'
import { PlacesContext } from '../../contexts/Places';

function Map({ places, coordinates, setCoordinates, setBoundaries }) {
  const classes = useStyles()
  const { setChildClicked } = useContext(PlacesContext)

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
        center={coordinates}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setBoundaries({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {
          places?.map((place, idx) => (
            <div
              key={idx}
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >

              <FmdGoodIcon color="primary" />
              <Chip className={classes.chip} label={place.name} />
            </div>
          ))
        }
      </GoogleMapReact>
    </div>
  )
}
export default Map