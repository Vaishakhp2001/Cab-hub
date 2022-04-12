import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

const ScreenForm = ({ children }) => {
    return (
        
            <Container>   
                <Row className="justify-content-md-center mt-5">
                    <Col xs={12} md={8}>
                       { children }
                    </Col>
                </Row>
            </Container>
        
    )
}

export default ScreenForm