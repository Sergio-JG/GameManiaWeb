import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import theme from './styles/themes'; // Import the theme

import GameDetailView from './routes/GameDetailView';
import Home from './routes/Home';
import Login from './routes/LoginView';
import RegisterView from './routes/RegisterView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/game/:id' element={<GameDetailView />} />
          <Route path='/register' element={<RegisterView />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
