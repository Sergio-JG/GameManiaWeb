import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import imagenJuego from '../images/default.jpg';

interface Game {
  gameId: string;
  title: string;
  price: number;
  description: string;
  releaseDate: string;
  numberOfSales: number;
  totalScore: number;
  genres: any[];
  platforms: any[];
  reviews: any[];
}

function GameList() {

  const [games, setGames] = useState<Game[]>([]);
  const [cart, setCart] = useState<Game[]>([]);

  const addToCart = (game: Game) => {
    setCart([...cart, game]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/game');
      if (!response.ok) {
        throw new Error('ERROR');
      }
      const result = await response.json();
      setGames(result);
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  const offerGames = games.filter(game => {
    return game.price < 20;
  });

  return (
    <Container maxWidth="lg" style={{ padding: '16px' }}>
      {/* Offer Games */}
      <Typography variant="h4" gutterBottom>
        Offer Games
      </Typography>
      <Grid container spacing={2}>
        {offerGames.map((game, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            {/* Game Card for Offer Games */}
            <Card>
              <Link to={`/game/${game.gameId}`}>
                <CardMedia
                  component="img"
                  alt={game.title}
                  height="140"
                  image={imagenJuego}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {game.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {game.description}
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {game.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(game)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popular Games */}
      {/* Offer Games */}
      <Typography variant="h4" gutterBottom>
        Offer Games
      </Typography>
      <Grid container spacing={2}>
        {offerGames.map((game, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            {/* Game Card for Offer Games */}
            <Card>
              <Link to={`/game/${game.gameId}`}>
                <CardMedia
                  component="img"
                  alt={game.title}
                  height="140"
                  image={imagenJuego}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {game.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {game.description}
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {game.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(game)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Games on Sale */}
      {/* Offer Games */}
      <Typography variant="h4" gutterBottom>
        Offer Games
      </Typography>
      <Grid container spacing={2}>
        {offerGames.map((game, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            {/* Game Card for Offer Games */}
            <Card>
              <Link to={`/game/${game.gameId}`}>
                <CardMedia
                  component="img"
                  alt={game.title}
                  height="140"
                  image={imagenJuego}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {game.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {game.description}
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {game.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(game)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default GameList;
