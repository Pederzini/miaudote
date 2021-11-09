import axios from 'axios';

const api = axios.create({
  baseURL: "localhost:8080/miaudote/animal/vitrine"
});

export default api;