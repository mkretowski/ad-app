import Ads from '../../features/Ads/Ads';
import { Row, Col, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getStatus, getAllAds } from '../../../redux/adsReducer';
import { getUserStatus, setUserStatus } from '../../../redux/userReducer';
import InfoToast from '../../features/InfoToast/InfoToast';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const userStatus = useSelector(getUserStatus);
  const { status } = useSelector(getStatus);

  useEffect(() => {
    return () => {
      dispatch(setUserStatus());
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
      {userStatus === 'login' && <InfoToast type={'Success'} action={'You have been successfuly login!'}></InfoToast>}
      {userStatus === 'logout' && <InfoToast type={'Success'} action={'You have been successfuly logout!'}></InfoToast>}
      {userStatus === 'register' && (
        <InfoToast type={'Success'} action={'You have been successfuly registered!'}></InfoToast>
      )}
    </>
  );
};

export default Home;
