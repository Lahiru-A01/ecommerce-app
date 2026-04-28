import axios from 'axios'

const BASE = 'https://fakestoreapi.com'

export const getProducts = () => axios.get(`${BASE}/products`).then(r => r.data)
export const getProduct = (id) => axios.get(`${BASE}/products/${id}`).then(r => r.data)
export const getCategories = () => axios.get(`${BASE}/products/categories`).then(r => r.data)
export const getByCategory = (cat) => axios.get(`${BASE}/products/category/${cat}`).then(r => r.data)

export const loginUser = async (username, password) => {
  const res = await axios.post(`${BASE}/auth/login`, { username, password })
  return res.data // returns { token }
}