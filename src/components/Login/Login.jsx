// src/components/Login.jsx
import React from 'react';
import './Login.css'; // You can reuse Signup.css with slight edits or make new
import Logincompo from './Logincompo';
import Navbarcompo from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Login = () => {
  return (
    <>
    <Navbarcompo></Navbarcompo>
    <Logincompo></Logincompo>
    <Footer></Footer>
    </>
  )
};

export default Login;
