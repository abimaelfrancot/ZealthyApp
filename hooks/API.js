import axios from 'axios';

export const api = axios.create({
     baseURL: 'http://3.97.243.202:3000'
  });