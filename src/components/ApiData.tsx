import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import imagenJuego from '../images/default.jpg';

function GameList() {

  interface Game {
    gameId:string;
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
  
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/game');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setGames(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <Container maxWidth="lg" style={{ padding: '16px' }}>
      <Grid container spacing={2}>
        {games.map((game, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={game.title}
                height="140"
                image={imagenJuego}
              />
              <CardContent>
                <Typography variant="h6">{game.title}</Typography>
                <Typography variant="body2" color="textSecondary">{game.description}</Typography>
                <Typography variant="h6" color="textPrimary">${game.price.toFixed(2)}</Typography>
                <Link to={`/game/${game.gameId}`}>
                  <Button variant="contained" color="secondary">
                    View More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default GameList;
