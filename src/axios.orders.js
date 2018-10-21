import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aimanski-my-burger.firebaseio.com/'
})

export default instance
