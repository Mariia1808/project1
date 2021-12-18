import Footer from './components/Footer';
import {observer} from "mobx-react-lite";
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";


const App = observer(() => {
  
    return (
      <BrowserRouter>
          <div>
          <NavBar/>
          <AppRouter />
          <Footer/> 
          </div>
      </BrowserRouter>
    );
});

export default App;
