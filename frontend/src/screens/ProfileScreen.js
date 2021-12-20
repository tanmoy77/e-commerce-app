import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../actions/userActions'
import {Form, Button, Row, Col} from 'react-bootstrap';
import {updateUserDetails} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

function ProfileScreen({history, location}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]  = useState(''
    )
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userUpdate = useSelector(state=>state.userUpdate)
    const {success} = userUpdate
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
            } else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[userInfo, history, dispatch, user, success])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserDetails(name, email, password))
    }
    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>My Profile</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                            type="text"
                            value={name}
                            onChange = {(e)=>setName(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange = {(e)=>setEmail(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                            type="password"
                            value={password}
                            onChange = {(e)=>setPassword(e.target.value)}
                            placeholder = 'Enter password'
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange = {(e)=>setConfirmPassword(e.target.value)}
                            placeholder = 'Confirm password'
                            >

                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-3'>Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col >
            </Row>
        </div>
    )
}

export default ProfileScreen
