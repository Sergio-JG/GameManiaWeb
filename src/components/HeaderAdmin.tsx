import { AppBar, Toolbar, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const headerStyles = {
  background: 'black',
  color: 'white',
  padding: 10,
};

const HeaderAdmin = () => {

  return (
    <AppBar position="sticky" style={headerStyles}>
      <Toolbar>
        <Grid container justifyContent="space-evenly">
          <Link to="/entity/account" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Account</Typography>
          </Link>
          <Link to="/entity/address" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Address</Typography>
          </Link>
          <Link to="/entity/credit-card" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Credit Card</Typography>
          </Link>
          <Link to="/entity/account" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Account</Typography>
          </Link>
          <Link to="/entity/address" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Address</Typography>
          </Link>
          <Link to="/entity/credit-card" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Credit Card</Typography>
          </Link>
          <Link to="/entity/account" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Account</Typography>
          </Link>
          <Link to="/entity/address" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Address</Typography>
          </Link>
          <Link to="/entity/credit-card" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Credit Card</Typography>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
