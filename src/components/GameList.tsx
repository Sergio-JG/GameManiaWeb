import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import GameInterface from '../interfaces/GameInterface';
import ImagenLogin from '../../public/images/games/Cyberpunk2077.jpg';
import { CartContext } from '../components/CartContext';
import axios from 'axios';

const GameList = () => {

  const [games, setGames] = useState<GameInterface[]>([]);
  const { addToCart } = useContext(CartContext);

  const IMAGEN_URL = '/images/games/';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/game');
      if (response.status === 200) {
        const result = response.data;
        setGames(result);
        console.log(result);
      } else {
        throw new Error('ERROR');
      }
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  const popularGames = [...games].sort((a, b) => b.numberOfSales - a.numberOfSales);
  const lastReleasedGames = [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  const offerGames = games.filter(game => game.price < 20);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <img src={ImagenLogin} alt="Big" style={{ width: '100%', height: 600, objectFit: 'cover' }} />
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> Ultimos lanzamientos </Typography>
        <Grid container spacing={6}>
          {lastReleasedGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="200"
                    image={IMAGEN_URL + game.image}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" color="black">{`${game.price}€`}</Typography>
                  </Grid>
                </Grid>
                {game.stock === 0 ? (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Typography variant="body1" color="primary" > </Typography>
                    <Typography variant="body1" color="error" > No Disponible </Typography>
                  </Grid>
                ) : (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar</Button>
                    <Typography variant="body1" color="primary" > Disponible </Typography>
                  </Grid>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> Ofertas </Typography>
        <Grid container spacing={6}>
          {offerGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="200"
                    image={IMAGEN_URL + game.image}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="red" style={{ textDecoration: 'line-through' }}>{`${game.price}€`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="black">{`${(game.price - (game.price * (20 / 100))).toFixed(2)}€`}</Typography>
                  </Grid>
                </Grid>
                {game.stock === 0 ? (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Typography variant="body1" color="primary" > </Typography>
                    <Typography variant="body1" color="error" > No Disponible </Typography>
                  </Grid>
                ) : (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar</Button>
                    <Typography variant="body1" color="primary" > Disponible </Typography>
                  </Grid>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: '20px 30px' }}>
        <Typography variant="h4" style={{ padding: '20px' }}> Más vendidos </Typography>
        <Grid container spacing={6}>
          {popularGames.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
                <Link to={`/game/${game.gameId}`}>
                  <CardMedia
                    component="img"
                    alt={game.title}
                    height="200"
                    image={IMAGEN_URL + game.image}
                  />
                </Link>
                <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                  <Grid item>
                    <Typography variant="h6"> {game.title} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3" color="black">{`${game.price}€`}</Typography>
                  </Grid>
                </Grid>
                {game.stock === 0 ? (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Typography variant="body1" color="primary" > </Typography>
                    <Typography variant="body1" color="error" > No Disponible </Typography>
                  </Grid>
                ) : (
                  <Grid container justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
                    <Button variant="contained" color="primary" onClick={() => addToCart(game)}>Comprar</Button>
                    <Typography variant="body1" color="primary" > Disponible </Typography>
                  </Grid>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GameList;
