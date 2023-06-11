import { useEffect } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/userReducer';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        dispatch(logOut());
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return null;
};

export default Logout;
