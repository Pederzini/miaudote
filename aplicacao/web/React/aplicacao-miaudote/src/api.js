import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/miaudote/animais/vitrine"
});

export default api;