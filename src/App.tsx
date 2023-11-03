import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/LoginView';
import GameDetailView from './routes/GameDetailView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/game/:id' element={<GameDetailView />} />
      </Routes>
    </div >
  );
}

export default App;
