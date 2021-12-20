import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate'
import Message from "../components/Message";
function HomeScreen({history}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const keyword = history.location.search;
  let keywordAlone = ''

  if(keyword){
     keywordAlone = keyword.split('?keyword=')[1].split('&page=')[0]
  } 
  useEffect(() => {
    dispatch(listProducts(keyword));
    console.log(keywordAlone)
  }, [dispatch, keyword]);
  return (
    <div>
      {keywordAlone? <h4>search results for '{keywordAlone}'</h4>:<h3>Latest Products</h3>}
      
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div><Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
