import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import '../styles/Header.css'

function HomeScreen({ history}) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = ''

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div className="home-screen-container text-center">
      {/* {!keyword && <ProductCarousel />} */}
      <h3>Be Exclusive
        
      </h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="home-screen-product-list-container text-center">
          <Row className="home-screen-product-list justify-content-center">
            {products.map(product => (
              <Col key={product._id} sm={15} md={10} lg={4} xl={3} className="home-screen-product-col">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} className="home-screen-pagination" />
        </div>
      )}
    </div>
  )
}

export default HomeScreen
