import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'
import  {useDispatch, useSelector} from 'react-redux'

function PaymentScreen({history}) {
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    

    useEffect(()=>{
        if(!shippingAddress.address){
            history.push('/shipping')
        }
    },[shippingAddress.address])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <h2>Payment Method</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group idControl='paymentMethod'>
                    <Form.Label>
                            Select Method
                    </Form.Label>
                    <Col>
                    <Form.Check
                    type='radio'
                    id='paypal'
                    name='paymentMethod'
                    value='paypal'
                    onChange={e=> setPaymentMethod(e.target.value)}
                    label='payment or credit card'
                    checked
                    >

                    </Form.Check>
                    </Col>
                </Form.Group>
                
                <Button
                type='submit'
                variant = 'primary'
                className='my-3'
                >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
