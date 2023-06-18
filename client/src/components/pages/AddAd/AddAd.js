import AdForm from '../../features/AdForm/AdForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { addAdRequest } from '../../../redux/adsReducer';
import { useCallback } from 'react';
import { getUser } from '../../../redux/userReducer';
import { fetchAds } from '../../../redux/adsReducer';
import { setActionStatus } from '../../../redux/adsReducer';

const AddAd = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async (ad) => {
      try {
        const reqStatus = await dispatch(addAdRequest(ad)).unwrap();
        if (reqStatus === 200) {
          dispatch(fetchAds());
          dispatch(setActionStatus('add'));
          return navigate('/ads/myads');
        } else if (reqStatus === 400) {
          return 'clientError';
        } else {
          return 'serverError';
        }
      } catch (rejectedValueOrSerializedError) {
        return 'serverError';
      }
    },
    [dispatch, navigate]
  );

  if (user) {
    return <AdForm action={handleSubmit} actionText='Add ad' />;
  } else {
    return <Navigate to='/' />;
  }
};
export default AddAd;
