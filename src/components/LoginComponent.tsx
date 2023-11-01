import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import logo from '../images/logo.png';
import ImagenLogin from '../images/loginimage.jpg';

const LoginComponent: React.FC = () => {

  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    console.log('Username:', email);
    console.log('Password:', password);

  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1A17' }}>
        <Grid container component="form" onSubmit={handleLogin} noValidate sx={{ padding: 5, justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Link to={`/`}>
            <img
              src={logo}
              alt="Logo"
            />
          </Link>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container sx={{ justifyContent: 'left' }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/register'>
                {"¿Has olvidado la contraseña?"}
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register'>
                {"¿No tienes una cuenta?"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={6} md={7}
        sx={{
          backgroundImage: `url(${ImagenLogin})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

    </Grid>
  );

};

export default LoginComponent;

