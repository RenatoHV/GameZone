import React from 'react';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
  const isOnSale = parseFloat(product.oldPrice) > parseFloat(product.price);

  const handleAddToCart = () => {
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleBuyNow = () => {
    alert(`Comprando ${product.name}...`);
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card custom-card h-100 position-relative">
        {isOnSale && (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            SALE OFF
          </span>
        )}
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body text-center d-flex flex-column">
          <p className="card-title mb-1 fw-bold">{product.name}</p>
          <small className="text-muted">{product.platform}</small>
          
          <div className="mt-2 mb-3">
            {product.oldPrice && (
              <small className="text-muted me-2">
                <s>R$ {product.oldPrice?.toFixed(2)}</s>
              </small>
            )}
            <h5 className="text-price d-inline text-success fw-bold">
              R$ {product.price?.toFixed(2)}
            </h5>
          </div>

          <div className="mt-auto d-flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="btn btn-outline-primary flex-grow-1"
            >
              <i className="fa-solid fa-cart-plus me-1"></i>
              Carrinho
            </button>
            <button 
              onClick={handleBuyNow}
              className="btn btn-primary flex-grow-1"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}