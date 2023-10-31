import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const footerStyles = {
  background: 'black',
  color: 'white',
  padding: '8px',
};

const Footer = () => {
  return (
    <AppBar position="sticky" style={footerStyles}>
      <Toolbar>
        <Grid container justifyContent="center">
          <ul style={{ listStyle: 'none', display: 'flex' }}>
            <li>
              <Button variant="text" style={{ color: 'white', margin: '0 10px' }}>
                About Us
              </Button>
            </li>
            <li>
              <Button variant="text" style={{ color: 'white', margin: '0 10px' }}>
                Contact
              </Button>
            </li>
            <li>
              <Button variant="text" style={{ color: 'white', margin: '0 10px' }}>
                Terms of Use
              </Button>
            </li>
          </ul>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
