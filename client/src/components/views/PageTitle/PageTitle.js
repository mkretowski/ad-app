import { Col } from 'react-bootstrap';
const PageTitle = (props) => {
  return (
    <Col className='p-0'>
      <h1>{props.children}</h1>
    </Col>
  );
};
export default PageTitle;
