import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter, Routes, Route,} from "react-router-dom";

import './index.css';
import App from './App';

import PokemonDetail from './PokemonDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="detail/:id" element={<PokemonDetail />} />
      <Route path="*" element={<main><p>404</p></main>}
    />
    </Routes>
  </BrowserRouter>
);


