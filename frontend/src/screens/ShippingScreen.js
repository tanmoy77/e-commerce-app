import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import {useSelector, useDispatch} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps';
function ShippingScreen({history}) {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
            e.preventDefault()
            dispatch(saveShippingAddress({address, city, postalCode, country}))
            history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h2>Shipping</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='address'>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                    type='text'
                    value={address? address:''}
                    onChange={(e)=>setAddress(e.target.value)}
                    placeholder='Enter Address'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                    type='text'
                    value={city? city:''}
                    onChange={(e)=>setCity(e.target.value)}
                    placeholder='Enter City'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                    type='text'
                    value={postalCode? postalCode:''}
                    onChange={(e)=>setPostalCode(e.target.value)}
                    placeholder='Enter Postal Code'
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>
                        country
                    </Form.Label>
                    <Form.Control
                    type='text'
                    value={country? country:''}
                    onChange={(e)=>setCountry(e.target.value)}
                    placeholder='Enter Address'
                    >

                    </Form.Control>
                </Form.Group>
                <Button
                type='submit'
                variant='primary'
                className='my-3'
                >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
