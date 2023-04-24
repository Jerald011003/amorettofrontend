import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import axios from 'axios';
import { listMyOrders } from '../actions/orderActions';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteOrder } from '../actions/orderActions';
import { ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from '../constants/orderConstants';

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [bought, setBought] = useState(false);
  const [owned, setOwned] = useState(false);
  const [boughtQty, setBoughtQty] = useState(1); // new state variable to track the number of products the user has already bought

  const orderId = match.params.id
  const dispatch = useDispatch()


  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver


  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  

  useEffect(() => {
    dispatch({ type: ORDER_LIST_MY_RESET }); // reset the orders state when the component mounts
    dispatch(listMyOrders(order)); // call the API to get the user's orders
  }, [dispatch]);
  
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  
  
  // const dispatch = useDispatch()

  



  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  
  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch({ type: ORDER_DELETE_REQUEST });

      dispatch(deleteOrder(id)).then((res) => {
        if (res.type === ORDER_DELETE_SUCCESS) {
          dispatch(listMyOrders());
        } else if (res.type === ORDER_DELETE_FAIL) {
          console.log(res.payload);
        }
      });
    }
  };

  return (
    <div >
      <Link to="/plan" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className='text-center'>
          <Row className='text-center'>
            {/* <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col> */}

          

            <Col md={12} className='text-center'>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

      
                <ListGroup.Item className='text-center'>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={12} className='text-center'>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ backgroundColor: "#333" }}>
                   

                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                  
                                            <ListGroup.Item className="d-flex justify-content-center" style={{ backgroundColor: "#333" }}>

  <Col md={12} className="text-center" style={{ backgroundColor: "#333" }}>
    <br/>
  <h5 className="d-flex justify-content-center">Click Buy!</h5>
  {loadingOrders ? (
    <Loader />
  ) : errorOrders ? (
    <Message variant='danger'>{errorOrders}</Message>
  ) : (
    <h1 className="text-center">
      {orders.map(order => (
        <div key={order._id}>
          <h2>
            {order.isBought ? (
              <i className='fas fa-check d-flex justify-content-center' style={{ color: 'green' }}></i>
            ) : (
              <i className='fas fa-times d-flex justify-content-center' style={{ color: 'red' }}></i>
            )}
          </h2>

          <h4
            // onClick={() => addToCartHandler(order)}
            className="btn-block text-center"
            // type="button"
            disabled={order.isBought ? true : false} // set the disabled property based on order.isBought
          >
            You are already in plan
          </h4>

          <Button
          className='btn-sm'
          onClick={() => deleteOrderHandler(order._id)}
        >
          Cancel
        </Button>
        </div>
      ))}
    </h1>
  )}
</Col>

</ListGroup.Item>
<ListGroup.Item>

<Button
  onClick={() => addToCartHandler(order)}
  className="btn-block text-center"

  type="button"
  disabled={orders && orders.some((order) => order.isBought)}
>
  Buy
</Button>



</ListGroup.Item>



              </ListGroup>
            </Card>
        </Col>

        </Row>
  <Row>
   
  </Row>
</div>
)}
</div>
);
}
export default ProductScreen;