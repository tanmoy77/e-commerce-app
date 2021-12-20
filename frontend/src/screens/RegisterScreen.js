import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Form, Button, Row, Col
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {register} from '../actions/userActions'

function RegisterScreen({history, location}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state=> state.userRegister)
    const {loading, error, userInfo} = userRegister

    const dispatch = useDispatch()

    const redirect = location.search? location.search.split('=')[1]: '/'

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('passwords do not match')
        }
        else {
            dispatch(register(name, email, password, history, redirect))
        }
        
    }
    return (
        <FormContainer>
            <h2>Register</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control 
                    type='text'
                    value = {name}
                    onChange={e=>setName(e.target.value)}
                    placeholder = 'Enter your name'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control 
                    type='email'
                    value = {email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder = 'email'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                    type='password'
                    value = {password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder = 'password'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                    type='password'
                    value = {confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                    placeholder = 'confirm password'
                    >

                    </Form.Control>
                </Form.Group>
                <Button
                type='submit'
                variant = 'primary'
                className='mt-3'
                >
                    Register
                </Button>
                <Row>
                    <Col>Already have an account? <Link to={redirect? `/login?redirect=${redirect}` :'/login'}>Sign In</Link></Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
