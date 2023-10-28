import axios from 'axios';

const productsApi = axios.create({
  baseURL: 'http://localhost:5174/products',
});

export const getProducts = async () => { // funcion para obtener datos del api
  const res = await productsApi.get('/'); // "/" es igual a "http://localhost:5174/products"
  return res.data;
}

export const createProduct = (product) => { // funcion para crear productso
  productsApi.post('/', product);
}

export const deleteProduct = (id) => productsApi.delete(`/${id}`)

export const updateProduct = (product) => productsApi.put(`/${product.id}`, product)