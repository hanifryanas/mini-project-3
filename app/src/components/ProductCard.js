import React from 'react'
import './ProductCard.css'

//show product card
const ProductCard = ({product}) => {
  console.log(product);
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt="product" />
      </div>
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard