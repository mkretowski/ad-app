import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SearchAds from './components/pages/SearchAds/SearchAds';
import NotFound from './components/pages/NotFound/NotFound';
import { Container } from 'react-bootstrap';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { fetchAds } from './redux/adsReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/search' element={<SearchAds />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
