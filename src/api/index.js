import axios from 'axios'
const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"




export const getDestinationData = async (sw, ne) => {
  try {
    // perform request
    const { data: { data }} = await axios.get(URL, {
  
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': 'd834dcc8e2msh4630b2da619145bp14df2djsn757d0ecd5385',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}
