#### Localize
Welcome to Localize, its an application that loads local businesses / parks / attractions that are within the map region. We use the browsers native `navigator.geolocation.getCurrentPosition()` method to get latitude and longitude coordinates.

----------
##### App Screenshots
![home](/screenshots/home.png)
![favorites](/screenshots/favorites.png)
![register](/screenshots/register.png)
![login](/screenshots/login.png)

------

## Project Highlights

#### React Router Dom v6
* Persist a navbar component throughout all pages using `Routes` in `App.js`
* Routing allowed a single paged application to render different components / pages
------
#### Using google-map-react
https://www.npmjs.com/package/google-map-react
* Using of Longitude / Latitude coordinates
* Loading a map using `Google Javascript Map API`
* Filtering data & querying based on dropdown values
* Querying for Restaurants, hotels, or attractions based on location

------
#### Material UI layout (Similar to bootstrap Rows & Columns)
* Usage of `Typography`, `Grid`, `Input`, `FormControl`
* Using MaterialUI provided ease when developing the dashboard

------
#### Use of JWT, Cookies, to allow authentication and use of app
* Sent a jsonwebtoken back to the user after they registered / logged in, that way the browser knew who was on the app.
* JWT also permitted / restricted specific actions on the back end server to perform operations
* The Client used `ContextAPI` to allow for global state of user data

-----
#### `ContextAPI` for Global state and to avoid prop drilling
* `PlacesContext` and `UserContext` saved data of user's places from MongoDB
#### Trip Advisor API
* Usage of an API from RapidAPI that gets locations of Restaurants, Hotels, and Attractions
* Trip Advisor API provided latitude and longitude and other data for plotting pins on the map
-------
### Google Maps API - Place Autocomplete
* The Place Autocomplete sample demonstrates how to use the Place Autocomplete widget to provide a type-ahead search box.
```
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
```
-----
#### Utils 
* Creating a custom `fetch` hook for utility purposes when fetching resources from backend
* `verifyToken()` middleware to authenticate jsonwebtoken
* Error handling

### Connect Front end React App -> Backend Express Server via proxy
* Note: this can point to any server. It can be another local backend in Java or Python, or it could be a real server on the internet. It will forward the request to the server specified in "proxy".