import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import  FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

function Login({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1]: '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, history, redirect))
    }
    return (
        <FormContainer>
            <h2>Sign In</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>email</Form.Label>
                    <Form.Control value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    placeholder='Enter email'
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control value={password}
                    type='password'
                    placeholder='Enter password'
                    onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>Login</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                New customer? <Link to={redirect? `/register?redirect=${redirect}`: '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
