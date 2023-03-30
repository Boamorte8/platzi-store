import React from 'react';

const Product = ({ product, handleAddToCart }) => (
  <div className="Products-item">
    <img src={product.images[0]} alt={product.title} />
    <div className="Products-item-info">
      <h2>
        {product.title}
        <span>${product.price}</span>
      </h2>
      <p>{product.description}</p>
    </div>
    <button type="button" onClick={handleAddToCart(product)}>
      Comprar
    </button>
  </div>
);

export default Product;
