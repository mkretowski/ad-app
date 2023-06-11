import Ads from '../../features/Ads/Ads';
import { Row, Col, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useSelector } from 'react-redux';
import { getStatus, getAllAds } from '../../../redux/adsReducer';

const Home = () => {
  const ads = useSelector(getAllAds);
  const { status } = useSelector(getStatus);

  return (
    <>
      <Row className='m-0 p-2 text-center'>
        <PageTitle>Homepage</PageTitle>
      </Row>
      {status === 'loading' && <Spinner animation='border' variant='primary' className='d-block mx-auto' />}
      {!status && <Col className='text-center'>No ads to show...</Col>}
      {status === 'idle' && <Ads ads={ads} />}
    </>
  );
};

export default Home;
