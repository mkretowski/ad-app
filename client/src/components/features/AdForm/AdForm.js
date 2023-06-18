import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row, Alert, Image } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { API_URL } from '../../../config';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import './AdForm.scss';

const AdForm = ({ action, actionText, ...props }) => {
  const [payload, setPayload] = useState({ id: props._id });
  const [title, setTitle] = useState(payload.title || props.title || '');
  const [price, setPrice] = useState(payload.price || props.price || '');
  const [localisation, setLocalisation] = useState(payload.localisation || props.localisation || '');
  const [image, setImage] = useState(payload.image || props.image || null);
  const [previewImage, setPreviewImage] = useState(null);
  const [content, setContent] = useState(payload.content || props.content || '');
  const [contentError, setContentError] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);
  const handleSubmit = async () => {
    const cleanedHTMLContent = content.replace(/<[^>]+>/g, ''); //clean from html tags

    if (cleanedHTMLContent.length < 20 || cleanedHTMLContent.length > 1000) {
      setContentError(true);
    }
    if (cleanedHTMLContent) {
      const req = await action({ ...payload });
      // if (req === 'success') {
      //   formRef.current.reset();
      //   setStatus('success');
      //   setTitle('');
      //   setPrice('');
      //   setLocalisation('');
      //   setContent('');
      //   setImage(null);
      //   setPreviewImage(null);
      // } else
      if (req === 'clientError') {
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    }
  };
  const handleContent = (text) => {
    setContent(text);
    setPayload((prevPayload) => ({
      ...prevPayload,
      content: text,
    }));
  };
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Col className='col-md-8 col-12 mx-auto text-center p-2'>
      <PageTitle>{actionText}</PageTitle>
      <Form ref={formRef} onSubmit={validate(handleSubmit)}>
        {status === 'serverError' && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='danger'>
            <Alert.Heading>Invalid data</Alert.Heading>
            <p>Fill all the fields properly.</p>
          </Alert>
        )}

        <Form.Group className='mb-3 col-12' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register('title', { required: true, minLength: 10, maxLength: 50 })}
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setPayload((prevPayload) => ({
                ...prevPayload,
                title: e.target.value,
              }));
            }}
          />
          {errors.title && <small className='d-block form-text text-danger mt-2'>Title is invalid.</small>}
        </Form.Group>
        <Row>
          <Form.Group as={Col} className='mb-3' controlId='price'>
            <Form.Label>Price $</Form.Label>
            <Form.Control
              {...register('price', { required: true, min: 0 })}
              type='number'
              placeholder='Price'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setPayload((prevPayload) => ({
                  ...prevPayload,
                  price: e.target.value,
                }));
              }}
            />
            {errors.price && <small className='d-block form-text text-danger mt-2'>Price is invalid.</small>}
          </Form.Group>
          <Form.Group as={Col} className='mb-3' controlId='localisation'>
            <Form.Label>Localisation</Form.Label>
            <Form.Control
              {...register('localisation', { required: true, minLength: 2, maxLength: 25 })}
              type='text'
              placeholder='Localisation'
              value={localisation}
              onChange={(e) => {
                setLocalisation(e.target.value);
                setPayload((prevPayload) => ({
                  ...prevPayload,
                  localisation: e.target.value,
                }));
              }}
            />
            {errors.localisation && (
              <small className='d-block form-text text-danger mt-2'>Localisation is invalid.</small>
            )}
          </Form.Group>
        </Row>
        <Form.Group className='mb-3' controlId='formFile'>
          <Form.Label>Image</Form.Label>
          <Row className='mb-3 p-0'>
            <div className='imageContainer'>
              {image && !previewImage && (
                <Image
                  style={{ width: '100%', height: '100%' }}
                  className='object-fit-cover'
                  src={`${API_URL}/uploads/${image}`}
                  alt={image}
                  roundedCircle
                />
              )}
              {previewImage && (
                <Image
                  style={{ width: '100%', height: '100%' }}
                  className='object-fit-cover'
                  src={URL.createObjectURL(previewImage)}
                  alt='Uploaded Image'
                  roundedCircle
                />
              )}
              <Button
                variant='primary'
                className='m-0 imageButton'
                onClick={() => {
                  const fileInput = document.getElementById('formFile');
                  fileInput.click();
                }}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </Button>
              {!image && !previewImage && <span className='imageInfo'>No Image</span>}
            </div>
          </Row>
          <Form.Control
            {...register('formFile', { required: previewImage ? true : false })}
            type='file'
            className='d-none'
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPayload((prevPayload) => ({
                ...prevPayload,
                image: e.target.files[0],
              }));
              setPreviewImage(e.target.files[0]);
            }}
          />
          {errors.formFile && <small className='d-block form-text text-danger mt-2'>File is invalid.</small>}
        </Form.Group>
        <Form.Group className='mb-3' controlId='mainContent'>
          <Form.Label>Content</Form.Label>
          <ReactQuill theme='snow' value={content} onChange={handleContent} defaultValue placeholder='...' />
          {contentError && <small className='d-block form-text text-danger mt-2'>Content can't be empty</small>}
        </Form.Group>
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
      </Form>
    </Col>
  );
};
AdForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
};
export default AdForm;
