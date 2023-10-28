import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {  getProducts, deleteProduct, updateProduct } from '../api/productsAPI';

function Products() {
  
  // const query = useQuery();
  // query.data
  // query.isLoading
  // query.error
  // query.isError
  const {isLoading, isError, data: products, error} = useQuery({ // READ
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id) // ordena la respuesta de mayor a meno
  });

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({ // DELETE
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products') // dice que la consulta "products" debe volver a ser solicitada
    }
  })
  
  const updateproductMutation = useMutation({ // UPDATE
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })


  if(isLoading) {
    return <div>{"Loading..."}</div>
  } else if(isError) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      {products.map( el => (
        <div key={crypto.randomUUID()}>
        <h3>{el.name}</h3>
        <p>{el.description}</p>
        <p>{el.price}</p>
        <button onClick={() => deleteProductMutation.mutate(el.id)}>Delete</button>
        <input type="checkbox" id={el.id}  checked={el.stock} name='check' onChange={ e => {
          updateproductMutation.mutate({
            ...el,
            stock: e.target.checked
          })
          }} />
        <label htmlFor={el.id}>In Stock</label>
        </div>
      ))}
    </div>
  );
}

export default Products;