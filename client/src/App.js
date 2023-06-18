import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SearchAds from './components/pages/SearchAds/SearchAds';
import NotFound from './components/pages/NotFound/NotFound';
import { Container } from 'react-bootstrap';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import AddAd from './components/pages/AddAd/AddAd';
import MyAds from './components/pages/MyAds/MyAds';
import { fetchAds } from './redux/adsReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserRequest } from './redux/userReducer';
import AdUpdate from './components/pages/AdUpdate/AdUpdate';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/search' element={<SearchAds />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/ads/new' element={<AddAd />} />
        <Route path='/ads/update/:id' element={<AdUpdate />} />
        <Route path='/ads/myads' element={<MyAds />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
