import { Form, Button, Row, Alert, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/adsReducer';
const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    };

    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn(login));
          //navigation
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <>
      <Row className='m-0 p-2 text-center'>
        <PageTitle>Login</PageTitle>
      </Row>
      <Row className='p-3 justify-content-center'>
        <Form className='col-12 col-md-7 col-lg-4' onSubmit={handleSubmit}>
          {status === 'success' && (
            <Alert variant='success'>
              <Alert.Heading>Success</Alert.Heading>
              <p>You have been successfuly logged in!</p>
            </Alert>
          )}

          {status === 'serverError' && (
            <Alert variant='danger'>
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>Unexpected error... Try again!</p>
            </Alert>
          )}

          {status === 'clientError' && (
            <Alert variant='danger'>
              <Alert.Heading>Incorrect data</Alert.Heading>
              <p>Login or password are incorrect.</p>
            </Alert>
          )}

          {status === 'loading' && (
            <Spinner animation='border' variant='primary' role='status' className='d-block mx-auto' />
          )}

          <Form.Group className='mb-3' controlId='formLogin'>
            <Form.Label>Login</Form.Label>
            <Form.Control
              type='text'
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              placeholder='Enter login'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder='Password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Sign in
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default Login;
