import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";  // Make sure to import Switch from react-router-dom
import MyHeader from "./components/header/MyHeader";
import ViewsRoutes from './routes/viewsRoutes';

import './style/style.css'

const App = () => {

    // useEffect(() => {
    //     dispatch(auth());
    // }, [dispatch]);
    return (
      <BrowserRouter>
          <div>
              <div>
                  <MyHeader/>
              </div>
              <div style={{display: "flex", justifyContent: "center"}}>
                <ViewsRoutes />
              </div>
          </div>
      </BrowserRouter>
  );
};

export default App;


