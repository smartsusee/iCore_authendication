import axios from  "axios"

const AuthAxios = axios.create({
    baseURL: 'http://localhost:3005'
  });

  
export {AuthAxios}