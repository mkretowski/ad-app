import { useEffect } from 'react';
import { API_URL } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../../../redux/userReducer';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    if (user) {
      fetch(`${API_URL}/auth/logout`, options)
        .then((res) => {
          dispatch(logOut());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  return <Navigate to='/' />;
};

export default Logout;
