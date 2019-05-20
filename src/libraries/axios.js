import axios from 'axios';

const { REACT_APP_SERVER_BASE_URL } = process.env;

const serverInstance = axios.create({
  baseURL: REACT_APP_SERVER_BASE_URL,
});

export default serverInstance;
