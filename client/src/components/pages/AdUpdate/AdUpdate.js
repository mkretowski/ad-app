import AdForm from '../../features/AdForm/AdForm';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsReducer';
import { updateAdRequest } from '../../../redux/adsReducer';
import { Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getUser } from '../../../redux/userReducer';
import { fetchAds } from '../../../redux/adsReducer';
import { setActionStatus } from '../../../redux/adsReducer';

const AdUpdate = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const adId = id;
  const adData = useSelector((state) => getAdById(state, adId));

  const handleSubmit = useCallback(
    async (ad) => {
      try {
        const reqStatus = await dispatch(updateAdRequest(ad)).unwrap();
        if (reqStatus === 200) {
          dispatch(fetchAds());
          dispatch(setActionStatus('update'));
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
  if (user) return <AdForm action={handleSubmit} actionText='Update ad' {...adData} />;
  return <Navigate to='/' />;
};
export default AdUpdate;
