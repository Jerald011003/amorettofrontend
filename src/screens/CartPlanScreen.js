// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// import Message from '../components/Message'
// import { planaddToCart, planremoveFromCart } from '../actions/plancartActions'

// function CartScreen({ match, location, history }) {
// const planId = match.params.id
// const qty = location.search ? Number(location.search.split('=')[1]) : 1
// const dispatch = useDispatch()
// const plancart = useSelector(state => state.plancart)
// const { plancartItems } = plancart

// useEffect(() => {
//     if (planId) {
//         dispatch(planaddToCart(planId, qty))
//     }
// }, [dispatch, planId, qty])

// const planremoveFromCartHandler = (id) => {
//     dispatch(planremoveFromCart(id))
// }

// const checkoutHandler = () => {
//     history.push('/login?redirect=shipping')
// }

// return (
//     <Row>
//         <Col md={8}>
//             <h1>Purchases</h1>
            
//             {plancartItems.length === 0 ? (
//                 <Message variant='info'>
//                     Your cart is empty <Link to='/'>Go Back</Link>
//                 </Message>
//             ) : (
//                 <ListGroup variant='flush'>
//                     {plancartItems.map(item => (
//                         <ListGroup.Item key={item.plan}>
//                             <Row>
//                                 <Col md={2}>
//                                     <Image src={item.image} alt={item.name} fluid rounded />
//                                 </Col>
//                                 <Col md={3}>
//                                     <Link to={`/plan/${item.plan}`}>{item.name}</Link>
//                                 </Col>
//                                 <Col md={2}>
//                                     ${item.price}
//                                 </Col>
//                                 <Col md={3}>
//                                     {/* <Form.Control
//                                         as="select"
//                                         value={item.qty}
//                                         onChange={(e) => dispatch(planaddToCart(item.plan, Number(e.target.value)))}
//                                     >
//                                         {

//                                             [...Array(item.countInStock).keys()].map((x) => (
//                                                 <option key={x + 1} value={x + 1}>
//                                                     {x + 1}
//                                                 </option>
//                                             ))
//                                         }

//                                     </Form.Control> */}
//                                 </Col>
//                                 <Col md={1}>
//                                     <Button
//                                         type='button'
//                                         variant='light'
//                                         onClick={() => planremoveFromCartHandler(item.plan)}
//                                     >
//                                         <i className='fas fa-trash'></i>
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         </ListGroup.Item>
//                     ))}
//                 </ListGroup>
//             )}
//         </Col>

//         <Col md={4}>
//             <Card>
//                 <ListGroup variant='flush'>
//                     <ListGroup.Item>
//                         <h2>Total Cost</h2>
//                         ${plancartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
//                     </ListGroup.Item>
//                 </ListGroup>

//                 <ListGroup.Item>
//                     <Button
//                         type='button'
//                         className='btn-block'
//                         disabled={plancartItems.length === 0}
//                         onClick={checkoutHandler}
//                     >
//                         Proceed To Checkout
//                     </Button>
//                 </ListGroup.Item>
//             </Card>
//         </Col>
//     </Row>
// )
// }

// export default CartScreen