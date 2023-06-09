import Ads from '../../features/Ads/Ads';
import { Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchAdsStatus } from '../../../redux/adsReducer';
import { useState } from 'react';
import { searchAdsRequest } from '../../../redux/adsReducer';

const SearchAds = () => {
  const dispatch = useDispatch();
  const status = useSelector(getSearchAdsStatus);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [ads, setAds] = useState([]);
  const handleSubmit = async () => {
    try {
      const response = await dispatch(searchAdsRequest(searchPhrase)).unwrap();
      setAds(response.ads ? response.ads : []);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <>
      <Row className='m-0 p-2 text-center'>
        <PageTitle>Search ads</PageTitle>
      </Row>
      <Row className='justify-content-center'>
        <Form
          className='d-flex col-lg-6 col-10 mb-3'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
      {status === 'loading' && <Spinner animation='border' variant='primary' />}
      {!status && <Col className='text-center'>No ads to show...</Col>}
      {status === 'idle' && <Ads ads={ads} />}
    </>
  );
};

export default SearchAds;
