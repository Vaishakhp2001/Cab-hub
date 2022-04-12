import React, {useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register as registerAction } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)  

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch( registerAction(name,email,phone,password))
    }

    useEffect(() => {
        if(userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo ])

    return <FormContainer>
        <h1>Sign Up</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>User Name</Form.Label>
                <Form.Control 
                    type='name'
                    placeholder='Enter Username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>Enter phone</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>confirmPassword</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Sign Up
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
               <Link to={'/login'}>Already registered? Login</Link> 
                
            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen