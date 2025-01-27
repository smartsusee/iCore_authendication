import axios from  "axios"

const AuthAxios = axios.create({
    baseURL: 'http://localhost:3005'
  });


  const UserAxios = axios.create({
    baseURL: 'http://localhost:3005/route'
  });

  
export {AuthAxios, UserAxios}