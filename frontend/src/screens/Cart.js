import React, {useState, useEffect} from 'react'
import { addToCart, removeItem } from '../actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap'
import Message from '../components/Message';

function Cart({match, location, history}) {
    const productId = match.params.id
    const qty = location.search? Number(location.search.split('=')[1]): 1;
    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart
    console.log('cartItems:', cartItems)
    const dispatch = useDispatch()
    useEffect(()=>{if(productId){
        dispatch(addToCart(productId, qty))
    }
        
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeItem(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <div>
            <Row>
                <Col md={8}>
                    <h2>Shopping Cart</h2>
                    {cartItems.length===0? 
                    <Message variant="info">No Cart Items <Link to='/'>Go Back</Link></Message>:
                    (<ListGroup variant='flush'>
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid/>
                                    </Col>
                                    <Col md={3}>
                                        {item.name}
                                    </Col>
                                    <Col md={2}>
                                     ${item.price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                            {
                                [...Array(item.countInStock).keys()].map((x)=>(
                                    <option value={x+1} key={x+1}>
                                        {x+1}
                                    </option>
                                ))
                            }
                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=>removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)  
                }
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, item)=>acc+item.qty,0)}) items</h3>
                            ${cartItems.reduce((acc, item)=>acc+item.qty*item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                            type='button'
                            style={{width: '100%'}}
                            onClick={checkOutHandler}
                            disabled = {cartItems.length===0}
                            >
                                Proceed
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default Cart
