import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/userSignUp";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        
        <Route path='/start' element={
          <UserProtectedWrapper>
            <Start/>
          </UserProtectedWrapper>
        }>
        </Route>
        <Route  path="/logout" element ={<UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>}/>
        <Route path='/captains/logout' element={<CaptainProtectedWrapper>
          <CaptainLogout/>
        </CaptainProtectedWrapper>}/>
      </Routes>
    </div>
  );
};

export default App;
