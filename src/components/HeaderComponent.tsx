import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';

const headerStyles = {
  background: 'black',
  color: 'white',
  padding: '8px',
};

const searchStyles = {
  backgroundColor: 'white',
  borderRadius: '5px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

const iconStyles = {
  color: 'white',
};

const Header = () => {
  return (
    <AppBar position="sticky" style={headerStyles}>
      <Toolbar>
        <Grid container alignItems="center">
        <Grid item xs={4}>
          <Link to={`/`}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: '100px', marginRight: '10px' }}
              />
            </Link> 
          </Grid>
          <Grid item xs={4}>
            <div style={searchStyles}>
              <InputBase
                placeholder="   Search..."
                inputProps={{ 'aria-label': 'search' }}
                style={{ width: '100%' }}
              />
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={4}>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
              <li>
                <Link to={`/login`}>
                  <Button variant="outlined" style={iconStyles}>
                    Iniciar Sesión
                  </Button>
                </Link>           
              </li>
              <li>
                <Link to={`/register`}>
                  <Button variant="outlined" style={iconStyles}>
                   Registrarse
                  </Button>
                </Link> 
              </li>
            </ul>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
