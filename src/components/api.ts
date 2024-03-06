import axios from "axios";

const baseURL = "https://crudapi.co.uk/api/v1";
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ae1YtgbBb37jSjBdvcyjau8N8Mx1Md96sUgZ6qEpgjJ221adtQ",
  },
});

export default instance;
