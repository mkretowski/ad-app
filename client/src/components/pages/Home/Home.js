import Ads from '../../features/Ads/Ads';
import { Row, Col, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getStatus, getAllAds } from '../../../redux/adsReducer';
import { getUserStatus, resetStatus } from '../../../redux/userReducer';
import LogToast from '../../features/LogToast/LogToast';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const userStatus = useSelector(getUserStatus);
  const { status } = useSelector(getStatus);

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  return (
    <>
      <Row className='m-0 p-2 text-center'>
        <PageTitle>Homepage</PageTitle>
      </Row>
      {status === 'loading' && <Spinner animation='border' variant='primary' className='d-block mx-auto' />}
      {!status && <Col className='text-center'>No ads to show...</Col>}
      {status === 'idle' && <Ads ads={ads} />}
      {userStatus && <LogToast action={userStatus}></LogToast>}
    </>
  );
};

export default Home;
