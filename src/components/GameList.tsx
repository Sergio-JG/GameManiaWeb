import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import GameInterface from '../interfaces/GameInterface';
import ImagenLogin from '../images/prueba.png';
import { CartContext } from '../components/CartContext';
import axios from 'axios';

const GameList = () => {

  const [games, setGames] = useState<GameInterface[]>([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/game');
      if (response.status === 200) {
        const result = response.data;
        setGames(result);
      } else {
        throw new Error('ERROR');
      }
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  const popularGames = [...games].sort((a, b) => b.numberOfSales - a.numberOfSales);
  const offerGames = games.filter(game => game.price < 20);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <img src={ImagenLogin} alt="Big" style={{ width: '100%', height: 600, objectFit: 'cover' }} />
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> All Games </Typography>
        <Grid container spacing={6}>
          {games.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="140"
                    image={ImagenLogin}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} {game.stock} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" color="textSecondary">{`$${game.price}`}</Typography>
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar </Button>

              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> All Games </Typography>
        <Grid container spacing={6}>
          {games.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="140"
                    image={ImagenLogin}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} {game.stock} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" color="textSecondary">{`$${game.price}`}</Typography>
                  </Grid>
                  <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar </Button>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> All Games </Typography>
        <Grid container spacing={6}>
          {games.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="140"
                    image={ImagenLogin}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} {game.stock} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" color="textSecondary">{`$${game.price}`}</Typography>
                  </Grid>
                  <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar </Button>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GameList;
