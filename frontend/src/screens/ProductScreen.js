import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { listProductDetails, createReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productContants'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state)=>state.productReviewCreate)

  const {loading: reviewLoading,
         error: reviewError,
         success: reviewSuccess
  } = productReviewCreate

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  useEffect(
    () => {
      if(reviewSuccess || reviewError){
        setRating(0)
        setComment('')
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      }
      dispatch(listProductDetails(props.match.params.id));
    },
    [dispatch, props.match, reviewSuccess],
    props
  );

  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    console.log("Add to cart:", props.match.params.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createReview(props.match.params.id,{
      rating,
      comment
    }))
  }

  return (
    <div>
      <Link to="/" className="my-3 btn btn-secondary">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      disabled={product.countInStock == 0}
                      style={{ width: "100%" }}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Write a review</h4>
                  {reviewSuccess && <Message variant="success">Review Added Successfully</Message>}
                  {reviewError && <Message variant="danger">{reviewError}</Message>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>
                        Rating
                      </Form.Label>
                      <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e)=>setRating(e.target.value)}
                      >
                        <option value="0">Select a rating</option>
                        <option value="1">Poor</option>
                        <option value="2">Fair</option>
                        <option value="3">Good</option>
                        <option value="4">Very Good</option>
                        <option value="5">Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Review
                      </Form.Label>
                      <Form.Control as="textarea" 
                      row="4"
                      value={comment}
                      onChange ={(e)=> setComment(e.target.value)}
                      >
                            
                      </Form.Control>
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="primary" >Submit</Button>
                  </Form>
                </ListGroup.Item>
                <h4 className="m-3">Latest Reviews</h4>
                {product.reviews.map((review) => (
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>
                        
                        <p>
                        <i className="fas fa-user"></i>
                          <strong>{review.name}</strong>
                        </p>
                      </Col>
                      <Col md={9}>
                        <Row>
                          <Rating value={review.rating} color={"#f8e825"} />
                        </Row>
                        <Row>
                          <p>{review.comment}</p>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
