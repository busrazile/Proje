// src/services/tmdbService.ts
import axios from 'axios';

const API_KEY = 'b24e261dc298902ca5bc27a51d2856a4';
const API_URL = 'https://api.themoviedb.org/3';

const tmdbService = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdbService;
