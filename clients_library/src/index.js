import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FavoriteStore from './store/FavoriteStore';
import RateStore from './store/RateStore';
import RecipeStore from './store/RecipeStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)
console.log('http://localhost:5000/')

ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      recipe: new RecipeStore(),
      favorite: new FavoriteStore(),
      rating: new RateStore(),
    }}>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);

