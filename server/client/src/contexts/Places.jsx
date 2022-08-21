import axios from "axios"
import { useContext } from "react"
import { createContext, useEffect, useState } from "react"
// import { axiosInstance } from "../config"
import { UserContext } from "./User"

export const PlacesContext = createContext({
  favoritePlaces: [],
  childClicked: null,
  type: 'restaurants',
  rating: 0
})

export const PlacesProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  
  const [favoritePlaces, setFavoritePlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if(!user) return setFavoritePlaces([])
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
    fetchLocationData()
   
  }, [])

  






  const value = { favoritePlaces, setFavoritePlaces, childClicked, setChildClicked, rating, setRating, type, setType }
  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
}