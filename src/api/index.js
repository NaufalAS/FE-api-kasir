import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

const apiUrl = 'https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json';

axios.get(apiUrl)
  .then(response => {
    const provinces = response.data;
    console.log(provinces);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


export default   api;

