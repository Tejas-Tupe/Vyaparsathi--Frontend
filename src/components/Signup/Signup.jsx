import React from 'react';
import './Signup.css';
import Signupcompo from './Signupcompo';
import Navbarcompo from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Signup = () => {
  return (
    <>
    <Navbarcompo></Navbarcompo>
    <Signupcompo></Signupcompo>
    <Footer></Footer>
    </>
  );
};

export default Signup;
