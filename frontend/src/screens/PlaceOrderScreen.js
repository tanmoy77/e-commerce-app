import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { createOrder } from "../actions/orderActions";
import { emptyOrder } from "../actions/orderActions";
import { ORDER_ADD_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, error, success } = orderCreate;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = (itemsPrice * 0.082).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({type: ORDER_ADD_RESET})
    }
  }, [success, history, dispatch]);
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
      })
    );
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>Payment Method: {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.map((item, index) => (
                <Row>
                  <Col xs={3}>
                    <Image src={item.image} fluid rounded />
                  </Col>
                  <Col>
                    <p>{item.name}</p>
                  </Col>
                  <Col>
                    <p>
                      {item.qty} X ${item.price}=$
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </Col>
                </Row>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h2>Order Summery</h2>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <Button
                type="button"
                variant="primary"
                className="btn-block my-3"
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
