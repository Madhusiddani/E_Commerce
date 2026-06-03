import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-body">
        <p className="category">{product.category}</p>
        <Link className="product-title" to={`/product/${product._id}`}>
          {product.name}
        </Link>
        <div className="rating">Star {product.rating} ({product.numReviews})</div>
        <div className="product-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.countInStock > 0 ? 'In stock' : 'Sold out'}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
