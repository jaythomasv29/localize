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
  const {favoritePlaces} = useContext(PlacesContext)
  const [isLoading, setIsLoading] = useState(false)

  console.log(favoritePlaces)

  // set initial map coordinates using browsers geolocation method
  // get details of longitude and latitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude})
    }
    );
  }, []);
console.log(coordinates, boundaries)
  useEffect(() => {
    setIsLoading(true)
    async function fetchDestinations() {
      const data = await getDestinationData(boundaries.sw, boundaries.ne);
      setPlaces(data);
      setIsLoading(false)
    }
    fetchDestinations();
  }, [coordinates, boundaries]);

  return (
    <Grid container spacing={3} style={{ width: "100%" }}>
    {/* Sidebar List */}
    <Grid item xs={12} md={4}>
      <List 
        places={places}
        isLoading={isLoading}
        />
    </Grid>
    <Grid item xs={12} md={8}>
      <Map
        places={places}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        setBoundaries={setBoundaries}
      />
    </Grid>
  </Grid>
  )
}

export default Home