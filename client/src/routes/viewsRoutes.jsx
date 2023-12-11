import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";  // Make sure to import Switch from react-router-dom
import RegistrationForm from "../components/forms/RegistrationForm";
import LoginForm from "../components/forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import HomePage from '../views/HomePage';
import { useNavigate } from "react-router-dom";



function ViewsRoutes(){
    const dispatch = useDispatch();
                   
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    const navigate = useNavigate();
  
    useEffect(()=>{
      if( isAuth ){
        navigate('/');
      }
    }, [isAuth])

    return (
        <Routes>
            <Route path="*" element={<h1>Not found 404</h1>}/>
            {!isAuth ? (
                <>
                    {/* Use element prop to render components */}
                    <Route path="/registration" element={<RegistrationForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </>
            ) : 
                <>
                    {/* <Redirect to="/"/> */}
                    <Route path="/" element={<HomePage />} />
                </>
            }
        </Routes>
    );
}


export default ViewsRoutes;

