import React from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import logo from '../../assets/img/logo-disk.svg';

import './MyHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import {logoutPage} from '../../actions/user.js'


function MyHeader() {

    const isAuth = useSelector(store=>store.user.isAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = () => {
        dispatch(logoutPage());
        navigate("/login");
    }



    return (  
        <header className="header">
            <div className="conteiner">
                <div className="header__content">
                    <div className="header__logo">
                        <div className="header__img">
                            <img src={logo} alt="logo" />
                        </div>
                        <h1 className="header__title">Облачное хранилище</h1>
                    </div>
    
                    <div className="header__navbar">
                        <div className="navbar__content">
                            <ul className="navbar__items">
                                { !isAuth ?
                                    <>
                                        <li className="navbar__item">
                                            <Link to="/login">логин</Link>
                                        </li>
                                        <li className="navbar__item">
                                            <Link to="/registration">регистрация</Link>
                                        </li>
                                    </> 
                                :
                                    <>
                                        <li className="navbar__item">
                                            <button onClick={onClick}>Выйти</button>
                                        </li>
                                    </> 
                                }
            
                            </ul>
                        </div>
                    </div>
    
                </div>
            </div>
        </header>
    );
}

export default MyHeader;