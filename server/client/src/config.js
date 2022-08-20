import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "https://my-localize-app.herokuapp.com/api"
}) 