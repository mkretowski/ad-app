import Ads from '../../features/Ads/Ads';
import { Row, Spinner, Form, Button, Alert } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useState } from 'react';
import { API_URL } from '../../../config';
const SearchAds = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [ads, setAds] = useState([]);
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setAds([]);

    fetch(`${API_URL}/api/ads/search/${searchPhrase}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setAds(data.ads);
            setStatus('success');
          });
        } else if (res.status === 404) {
          setStatus('notFound');
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
        <PageTitle>Search ads</PageTitle>
      </Row>
      <Row className='justify-content-center'>
        <Form className='d-flex col-lg-6 col-10 mb-3' onSubmit={handleSubmit}>
          <Form.Control
            type='search'
            placeholder='Search'
            value={searchPhrase}
            onChange={(e) => {
              setSearchPhrase(e.target.value);
            }}
            className='m-2'
          />
          <Button variant='primary' className='m-2' type='submit'>
            Search
          </Button>
        </Form>
      </Row>
      {status === 'loading' && <Spinner animation='border' variant='primary' className='d-block mx-auto' />}
      {(status === 'success' || status === 'notFound') && <Ads ads={ads} />}
      {status === 'serverError' && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
    </>
  );
};

export default SearchAds;
