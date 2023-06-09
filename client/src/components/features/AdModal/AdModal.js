import { Modal, Button, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsReducer';
import { API_URL } from '../../../config';
import './AdModal.scss';

const AdModal = (props) => {
  const ad = useSelector((state) => getAdById(state, props.activead));
  if (!ad)
    return (
      <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ad not found.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  return (
    <Modal {...props} centered>
      <Modal.Header className='justify-content-center'>
        <Modal.Title>{ad.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='h-100 w-100 p-0 m-0'>
        <Image className='h-100 w-100 p-0 m-0' src={`${API_URL}/uploads/${ad.image}`} alt={ad.title} />
      </Modal.Body>
      <Modal.Body className='px-3 py-0 m-0 mt-3 mw-100'>
        <p>
          <strong>Localisation:</strong> {ad.localisation}
        </p>
        <p>
          <strong>Publication date:</strong> {ad.publicationDate}
        </p>
        <p>
          <strong>Price:</strong> {ad.price} $
        </p>
        <p>
          <strong>Description:</strong> {ad.content}
        </p>
      </Modal.Body>
      <Modal.Footer className='justify-content-center mt-3'>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdModal;
