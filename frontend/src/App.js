import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Login from './screens/Login';
import Cart from './screens/Cart';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (
    <div>
      <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/products/:id" component={ProductScreen} exact />
            <Route path="/login" component={Login} exact/>
            <Route path='/register' component={RegisterScreen} exact/>
            <Route path="/cart/:id?" component={Cart} exact/>
            <Route path='/profile' component={ProfileScreen} exact/>
            <Route path='/shipping' component={ShippingScreen} exact />
            <Route path='/payment' component={PaymentScreen} exact/>
            <Route path='/placeorder' component={PlaceOrderScreen} exact/>
            <Route path='/order/:id' component={OrderScreen} exact />
            </Switch>
        </Container>
      </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
