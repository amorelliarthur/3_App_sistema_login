import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.10.102:8080'
});

export default api;