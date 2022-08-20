import { useContext, useEffect, useState } from "react";
import { getDestinationData } from "../api";
import { Grid } from '@material-ui/core'
import { PlacesContext } from "../contexts/Places";
import Map from '../components/Map/Map'
import List from "../components/List/List";

function Home() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [boundaries, setBoundaries] = useState({});
  const {type, rating, setRating} = useContext(PlacesContext)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState(places)
    // useEffect for when rating Select changes
  useEffect(() => {
    // Filter rating of placecs in <List/> component
    const filteredLocations = places?.filter((place) => place.rating >= rating)
    setFilteredPlaces(filteredLocations)
  }, [rating, places, setRating, setFilteredPlaces])

  // set initial map coordinates using browsers geolocation method
  // get details of longitude and latitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude})
    }
    );
  }, []);

  useEffect(() => {
    setRating(0)
    setIsLoading(true)
    async function fetchDestinations() {
      const data = await getDestinationData(type, boundaries.sw, boundaries.ne);
      setPlaces(data);
      setFilteredPlaces(data)
      setIsLoading(false)
    }
    fetchDestinations();
  }, [type, coordinates, boundaries]);

  return (
    <Grid container spacing={3} style={{ width: "100%" }}>
    {/* Sidebar List */}
    <Grid item xs={12} md={4}>
      <List 
        places={filteredPlaces}
        isLoading={isLoading}
        />
    </Grid>
    <Grid item xs={12} md={8}>
      <Map
        places={filteredPlaces}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        setBoundaries={setBoundaries}
      />
    </Grid>
  </Grid>
  )
}

export default Home