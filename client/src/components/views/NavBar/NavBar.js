import { NavLink, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';

const NavBar = () => {
  return (
    <Navbar bg='primary' variant='dark' className='mt-4 mb-4 mx-2 rounded px-2 justify-content-between'>
      <Navbar.Brand href='/'>Ads.app</Navbar.Brand>
      <Nav>
        <Nav.Link className='px-3' as={NavLink} to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </Nav.Link>
        <NavDropdown className='px-3' title={<FontAwesomeIcon icon={faUser} />}>
          <NavDropdown.Item className='text-center' as={Link} to='/login'>
            Sign in
          </NavDropdown.Item>
          <NavDropdown.Item className='text-center' as={Link} to='/register'>
            Sign up
          </NavDropdown.Item>
          <NavDropdown.Item className='text-center' href='#action/3.3'>
            My profile
          </NavDropdown.Item>
          <NavDropdown.Item className='text-center' href='#action/3.4'>
            My ads
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className='text-center' as={Link} to='/logout'>
            Sign out
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link className='px-3' as={NavLink} to='/ads/search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
