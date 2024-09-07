import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

//auto them jwt vao moi request
const token = localStorage.getItem('jwtToken');
if(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;