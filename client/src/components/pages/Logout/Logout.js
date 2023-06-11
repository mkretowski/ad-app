import { useEffect } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/userReducer';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        dispatch(logOut());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return <Navigate to='/' />;
};

export default Logout;
