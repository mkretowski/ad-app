import PropTypes from 'prop-types';
import { Button, Col, Row, Card } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useState } from 'react';
import AdModal from '../AdModal/AdModal';
import './Ads.scss';

const Ads = ({ ads }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [activeAd, setActiveAd] = useState({});
  if (ads.length === 0) return <Col className='text-center'>No ads to show...</Col>;
  return (
    <>
      <Row className='p-2 m-0 text-center justify-content-center align-items-stretch'>
        {ads.map((ad) => (
          <Col key={ad._id} className='col-12 col-lg-4 m-0 p-3'>
            <Card className='h-100'>
              <Card.Img variant='top' src={`${API_URL}/uploads/${ad.image}`} alt={ad.title} />
              <Card.Body className='d-flex flex-column'>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Text className='mx-2 my-0 text-start'>
                  <strong>Localisation:</strong> {ad.localisation}
                </Card.Text>
                <Card.Text className='mx-2 my-0 text-start'>
                  <strong>Publication date:</strong> {ad.publicationDate}
                </Card.Text>
                <Card.Text className='mx-2 mt-0 mb-3 text-start'>
                  <strong>Price:</strong> {ad.price} $
                </Card.Text>
                <Button
                  variant='primary'
                  onClick={() => {
                    setDetailsModalShow(true);
                    setActiveAd(ad._id);
                  }}
                >
                  Read more
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <AdModal show={detailsModalShow} activead={activeAd} onHide={() => setDetailsModalShow(false)} />
    </>
  );
};
Ads.propTypes = {
  ads: PropTypes.array.isRequired,
};
export default Ads;
