import { NavLink, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userReducer';

const NavBar = () => {
  const user = useSelector(getUser);
  return (
    <Navbar bg='primary' variant='dark' className='mt-4 mb-4 mx-2 rounded px-2 justify-content-between'>
      <Navbar.Brand href='/'>Ads.app</Navbar.Brand>
      <Nav>
        <Nav.Link className='px-3' as={NavLink} to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </Nav.Link>
        <NavDropdown className='px-3' title={<FontAwesomeIcon icon={faUser} />}>
          {!user && (
            <NavDropdown.Item className='text-center' as={Link} to='/login'>
              Sign in
            </NavDropdown.Item>
          )}
          {!user && (
            <NavDropdown.Item className='text-center' as={Link} to='/register'>
              Sign up
            </NavDropdown.Item>
          )}
          {user && (
            <NavDropdown.Item className='text-center' as={Link} to='/ads/myads'>
              My ads
            </NavDropdown.Item>
          )}
          {user && (
            <NavDropdown.Item className='text-center' as={Link} to='/ads/new'>
              Add new ad
            </NavDropdown.Item>
          )}
          {user && <NavDropdown.Divider />}
          {user && (
            <NavDropdown.Item className='text-center' as={Link} to='/logout'>
              Sign out
            </NavDropdown.Item>
          )}
        </NavDropdown>
        <Nav.Link className='px-3' as={NavLink} to='/ads/search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
