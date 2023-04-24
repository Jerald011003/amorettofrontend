import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={12}>
               
                {cartItems.length === 0 ? (
                    <Message variant='info' class>
                        Be exclusive <Link to='/plan'>Click Here</Link>
                    </Message>
                ) : (
                       <div>
                            {cartItems.map(item => (
                                <h1 key={item.product}>
                                   
                                       
                                       
                                     

                                        

                                      

                                        <Col >
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                   
                                </h1>
                            ))}
                        </div>
                    )}
            </Col>

            <Col md={12}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item style={{ backgroundColor: "#333" }} className="background-dark">
                            <h2 >Price</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item className='text-center' style={{ backgroundColor: "#333" }}>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Pay
                               <br/>
                        </Button>
                     
                    </ListGroup.Item>

                    <br/>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen