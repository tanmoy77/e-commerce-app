import React,{useState} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            history.push(history.push(history.location.pathname))
        }
        // if(keyword){
        //     history.push(`/?keyword=${keyword}`)
        // } else{
        //     history.push(history.push(history.location.pathname))
        // }
        
    }
    return (
            <Form onSubmit={handleSubmit} inline>
                <Row>
                    <Col>
                <Form.Control
                type="text"
                onChange = {(e)=> setKeyword(e.target.value)}
                className = "mr-sm-2 ml-sm-5"
                >
                </Form.Control>
                </Col>
                <Col>
                <Button type="submit"
                variant='outline-success'
                >Search</Button>
                </Col>
                </Row>
            </Form>
        
    )
}

export default SearchBox
