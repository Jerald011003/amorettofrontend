import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import './Product.css'
function Product({ product, plan }) {
  return (
    <div className="text-center">
    <Card className="my-3 p-3 rounded bg-dark text-white ">
      <Link to={`/product/${product._id}`}>
        {/* <Card.Img src={product.image} variant="top" /> */}
      </Link>

      <Card.Body >
      <Link style={{ color: 'white', textDecoration: 'none' }} to={`/product/${product._id}`}>
  <Card.Title as="h3">
    <strong>{product.name}</strong>
  </Card.Title>
</Link>


        {/* <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={'#f8e825'}
            />
          </div>
        </Card.Text> */}

        <Card.Text as="h3" className="mb-3">
          ${product.price}
        </Card.Text>
        
{/* 
        <Card.Text as="h5" className="mb-3">
  {product.countInStock === 0 ? "Out of Stock" : `Available`}
</Card.Text> */}


<Link to={`/product/${product._id}`} className="btn btn-secondary">
  View Details
</Link>

      </Card.Body>
    </Card>
    </div>
  );
}

export default Product;
