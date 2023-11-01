import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './routes/Home';
import GameDetailView from './routes/GameDetailView';
import LoginView from './routes/LoginView';
import RegisterView from './routes/RegisterView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: '/game/:id',
    element: <GameDetailView />,
  },
  {
    path: '/register',
    element: <RegisterView />,
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
