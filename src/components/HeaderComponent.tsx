import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material/';
import { AppBar, IconButton, InputBase, Toolbar, Badge } from '@mui/material/';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import CartComponent from './CartComponent';
import { useState } from 'react';

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
  color: 'yellow',
};

const Header = () => {

  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

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
                <Search />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={4}>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'right' }}>
              <li>
                <IconButton style={iconStyles} onClick={handleCartOpen}>
                  <Badge badgeContent={5} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </li>
              <li>
                <Link to={`/login`}>
                  <IconButton style={iconStyles}>
                    <AccountCircle />
                  </IconButton>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Toolbar>
      <CartComponent open={isCartOpen} onClose={handleCartClose} />
    </AppBar>
  );
};

export default Header;
