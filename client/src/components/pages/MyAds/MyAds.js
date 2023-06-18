import { Row, Col, Button, Card } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getAdsByUser } from '../../../redux/adsReducer';
import { getUserId } from '../../../redux/userReducer';
import { Navigate, Link } from 'react-router-dom';
import { removeAdRequest, removeAd } from '../../../redux/adsReducer';
import { API_URL } from '../../../config';
import './MyAds.scss';
import { useState, useEffect } from 'react';
import InfoToast from '../../features/InfoToast/InfoToast';
import { getUser } from '../../../redux/userReducer';
import { setActionStatus, getAdActionStatus } from '../../../redux/adsReducer';

const MyAds = () => {
  const [toast, setToast] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userId = useSelector(getUserId);
  const adsActionStatus = useSelector(getAdActionStatus);
  const ads = useSelector((state) => getAdsByUser(state, userId));
  const handleDelete = async (ad) => {
    try {
      const reqStatus = await dispatch(removeAdRequest(ad._id)).unwrap();
      if (reqStatus === 200) {
        dispatch(removeAd(ad._id));
        setToast('deleted');
        setTimeout(() => setToast(''), [3000]);
      } else {
        setToast('error');
        setTimeout(() => setToast(''), [3000]);
      }
    } catch (rejectedValueOrSerializedError) {
      setToast('error');
      setTimeout(() => setToast(''), [3000]);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setActionStatus(null));
    };
  }, [dispatch]);

  if (!user) return <Navigate to='/' />;
  if (ads.length === 0) return <Col className='text-center'>No ads to show...</Col>;
  return (
    <>
      <Row className='m-0 p-2 text-center'>
        <PageTitle>My ads</PageTitle>
      </Row>
      <Col className='p-3 m-0'>
        {ads.map((ad) => (
          <Card key={ad._id} className='mb-3 mx-2'>
            <Row className='card-inner-container'>
              <Col className='col-12 col-lg-4 h-100'>
                <Card.Img className='object-fit-cover h-100' src={`${API_URL}/uploads/${ad.image}`} alt={ad.title} />
              </Col>
              <Col className='col-12 col-lg-8 text-center text-lg-start'>
                <Card.Body className='d-flex align-items-end flex-column h-100'>
                  <Col className='col-12'>
                    <Card.Title className='mx-1'>{ad.title}</Card.Title>
                    <Card.Text className='mx-1'>
                      <strong>Publication date:</strong> {ad.publicationDate}
                    </Card.Text>
                  </Col>
                  <Col className='col-12 mt-auto'>
                    <Row className='p-0 m-0 mt-2'>
                      <Button className='col mb-2 mx-1' variant='primary' as={Link} to={'/ads/update/' + ad._id}>
                        Update ad
                      </Button>
                      <Button
                        className='col mb-2 mx-1'
                        variant='primary'
                        onClick={async (e) => {
                          e.preventDefault();
                          handleDelete(ad);
                        }}
                      >
                        Delete ad
                      </Button>
                    </Row>
                  </Col>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Col>
      {toast === 'deleted' && <InfoToast type='Success' action={'Ad successfuly deleted!'}></InfoToast>}
      {toast === 'error' && <InfoToast type='Error' action={'Unexpected error... Try again!'}></InfoToast>}
      {adsActionStatus === 'update' && <InfoToast type='Success' action={'Ad successfuly updated!'}></InfoToast>}
      {adsActionStatus === 'add' && <InfoToast type='Success' action={'Ad successfuly added!'}></InfoToast>}
    </>
  );
};

export default MyAds;
