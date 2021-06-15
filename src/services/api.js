import axios from 'axios';

const api = axios.create({

    baseURL: 'https://senai-vacina.herokuapp.com/'
})



api.interceptors.request.use(config=>{
    console.log(config)

    return config
})

export default api;
