// contain the base method
import axios from 'axios';

// end point /api/v1 need to match the back end
const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});
