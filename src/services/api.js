import axios from 'axios';

const api = axios.create({

    baseURL: 'https://senai-vacina.herokuapp.com/'
})



//   api.interceptors.request.use(
//     async config => {
//       const keys = JSON.parse("Authorization")
//       const token = localStorage.getItem("Authorization")
//       config.headers = { 
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//       return config;
//     },
//     error => {
//       Promise.reject(error)
//     }
//   )



export default api;
