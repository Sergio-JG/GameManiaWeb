import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {createBrowserRouter,RouterProvider } from 'react-router-dom';

import Home from './routes/Home';
import GameDetail from './routes/GameDetail';
import ApiData from './components/ApiData';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/apidata',
    element: <ApiData />,
  },
  {
    path:'/contact',
    element: <h1> Hola </h1>,
  },
  {
    path: '/game/:id',
    element: <GameDetail />,
  } 
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
