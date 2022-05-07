import React, {useState} from 'react';
import './AddProduct.css';


const AddProduct = ({handleAddProduct}) => {
  const [product, setProduct] = useState({
      name: '',
      price: '',
      description: '',
      image: '',
  });
  
  const handleName = (e) => {
      const val = e.target.value;
      setProduct({...product, name: val});
  };

  const handlePrice = (e) => {
      const val = e.target.value;
      setProduct({...product, price: val});
  };

  const handleDescription = (e) => {
      const val = e.target.value;
      setProduct({...product, description: val});
  };

  const handleImage = (e) => {
      const val = e.target.value;
      setProduct({...product, image: val});
  };

  const handleValidation = () => {
      if (product.name === '' || product.price === '' || product.description === '' || product.image === '') {
          return false;
      } else {
          return true;
      }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      if (handleValidation()) {
          const newProduct = {
              name: product.name,
              price: product.price,
              description: product.description,
              image: product.image,
          }
          handleAddProduct(newProduct);
          setProduct({
              name: '',
              price: '',
              description: '',
              image: '',
          });
      } else {
          alert('Please fill all the fields');
      }
  }



  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={product.name}
          onChange={handleName}
          type="text"
          placeholder="name"
        ></input>
        <input
          value={product.price}
          onChange={handlePrice}
          type="text"
          placeholder="price"
        ></input>
        <input
          value={product.description}
          onChange={handleDescription}
          type="text"
          placeholder="description"
        ></input>
        <input
          value={product.image}
          onChange={handleImage}
          type="url"
          placeholder="image url"
        ></input>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
