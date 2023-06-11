import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

import './LogToast.scss';
const LogToast = ({ action }) => {
  const [show, setShow] = useState(true);

  return (
    <Col>
      <Toast className='position-absolute' onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header className='justify-content-between'>
          <h4>Success</h4>
        </Toast.Header>
        <Toast.Body className='text-center'>{`You have been successfully ${action}!`}</Toast.Body>
      </Toast>
    </Col>
  );
};

export default LogToast;
