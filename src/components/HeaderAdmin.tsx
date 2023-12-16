import { AppBar, Toolbar, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const headerStyles = {
  background: 'black',
  color: 'white',
  padding: 10,
};

const HeaderAdmin = () => {

  // const [activeLink, setActiveLink] = useState("/dashboard/game");

  // const handleLinkClick = (link: SetStateAction<string>) => {
  //   setActiveLink(link);
  // };

  return (
    <AppBar position="sticky" style={headerStyles}>
      <Toolbar>
        <Grid container justifyContent="space-evenly">
          <Link to="/dashboard/game" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Game</Typography>
          </Link>
          <Link to="/dashboard/provider" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Provider</Typography>
          </Link>
          <Link to="/dashboard/user" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">User</Typography>
          </Link>
          <Link to="/dashboard/purchase" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Purchase</Typography>
          </Link>
          <Link to="/dashboard/sale" style={{ textDecoration: 'none', color: "white" }}>
            <Typography color="inherit">Sale</Typography>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
