// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import Homecompo from './Home';
import Navbarcompo from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
   <>
   <Navbarcompo></Navbarcompo>
   <Homecompo></Homecompo>
   <Footer></Footer>
   </>
  )
};

export default Home;
