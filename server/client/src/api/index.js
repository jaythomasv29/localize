import axios from 'axios'



export const getDestinationData = async (type, sw, ne) => {
  try {
    // perform request
    const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
  
      params: {
        bl_latitude: sw?.lat,
        tr_latitude: ne?.lat,
        bl_longitude: sw?.lng,
        tr_longitude: ne?.lng,
      },
      headers: {
        'X-RapidAPI-Key': "994ae98f10msh86c45d918a6432bp1b4b2ejsn794d8a3a2e02",
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}
