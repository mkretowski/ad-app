import { Form, Button, Row, Alert, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { setUserStatus } from '../../../redux/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('image', avatar);

    const options = {
      method: 'POST',
      body: fd, //form-data
    };

    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
          dispatch(setUserStatus('register'));
          return navigate('/');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
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
        <PageTitle>Register</PageTitle>
      </Row>
      <Row className='p-3 justify-content-center'>
        <Form className='col-12 col-md-7 col-lg-4' onSubmit={handleSubmit}>
          {status === 'success' && (
            <Alert variant='success'>
              <Alert.Heading>Success</Alert.Heading>
              <p>You have been successfuly registered! You can now log in...</p>
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
              <Alert.Heading>Not enough data</Alert.Heading>
              <p>You have to fill all the fields.</p>
            </Alert>
          )}

          {status === 'loginError' && (
            <Alert variant='warning'>
              <Alert.Heading>Login already in use</Alert.Heading>
              <p>You have to use other login.</p>
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
          <Form.Group className='mb-3' controlId='formPhone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='tel'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder='Phone number'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFile'>
            <Form.Label>Avatar</Form.Label>
            <Form.Control type='file' onChange={(e) => setAvatar(e.target.files[0])} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Sign up
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default Register;
