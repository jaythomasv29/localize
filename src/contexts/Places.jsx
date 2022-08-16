import { createContext, useState } from "react"

export const PlacesContext = createContext({
  favoritePlaces: [],
  childClicked: null
})

export const PlacesProvider = ({ children }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)

  const value = { favoritePlaces, setFavoritePlaces, childClicked, setChildClicked }
  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
}