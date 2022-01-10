import axios from 'axios'

const api = axios.create({baseURL: 'http://ec2-15-229-10-69.sa-east-1.compute.amazonaws.com:8000/'})

export default api