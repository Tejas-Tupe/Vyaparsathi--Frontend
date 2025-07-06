import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/HomePage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pop-up.css'
import { Slide } from 'react-toastify';
import { AuthProvider } from './Authcontext';
import Dashboardcompo from './components/Dashboard/Dashboard';
import EditSignup from './components/Signup/EditSignup';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <AuthProvider> 
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/user/dashboard' element={<Dashboardcompo></Dashboardcompo>} />
        <Route path='/user/editprofile' element={<EditSignup></EditSignup>} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
