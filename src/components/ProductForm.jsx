import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsAPI';
function ProductForm() {

  const queryClient = useQueryClient();
  const createProductMutation = useMutation({ // CREATE
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products') // invalida la cache, trae nuevos datos, los compara y actualiza la interfaz
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target); // el target es el mismo formulario
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    // console.log(product);

    // envia los datos del producto al modulo "productsAPI" pasa su posterior proceso y envio por axios
    createProductMutation.mutate({
      ...product,
      stock: true
    });
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />

        <label htmlFor="price">$Price</label>
        <input type="number" id="price" name="price" />

        <button>Add Product</button>

      </form>
    </div>
  );
}

export default ProductForm;