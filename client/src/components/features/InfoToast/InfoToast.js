import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

import './InfoToast.scss';
const InfoToast = ({ action, type }) => {
  const [show, setShow] = useState(true);

  return (
    <Col>
      <Toast className='position-fixed' onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header className='justify-content-between'>
          <h4>{type}</h4>
        </Toast.Header>
        <Toast.Body className='text-center'>{action}</Toast.Body>
      </Toast>
    </Col>
  );
};

export default InfoToast;
