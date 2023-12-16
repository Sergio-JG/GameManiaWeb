import { Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Game, Genre, Platform, Review } from '../interfaces/GameInterface';
import axios from 'axios';

const GameDetail = () => {

  const { id } = useParams();
  const [game, setGame] = useState<Game>();
  const IMAGEN_URL = '/images/games/';

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/game/${id}`);
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    fetchGameDetails();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ padding: '16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {game?.title}
            </Typography>
            <Card>
              <CardHeader
                avatar={<Avatar alt={game?.title} src={game?.image} />}
                title={`Price: $${game?.price}`}
              />
              <CardMedia
                component="img"
                alt={game.title}
                height="400"
                image={IMAGEN_URL + game.image}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>Description:</Typography>
                <Typography variant="body1">{game?.description}</Typography>
                <Typography variant="h6" gutterBottom>Release Date:</Typography>
                <Typography variant="body1">{game?.releaseDate}</Typography>
                <Typography variant="h6" gutterBottom>Genres:</Typography>
                <div>
                  {game?.genres.map((genre: Genre) => (
                    <Chip key={genre.genreId} label={genre.name} style={{ marginRight: '5px' }} />
                  ))}
                </div>
                <Typography variant="h6" gutterBottom>Platforms:</Typography>
                <div>
                  {game?.platforms.map((platform: Platform) => (
                    <Chip key={platform.platformId} label={platform.name} style={{ marginRight: '5px' }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography variant="h4" gutterBottom>Reviews</Typography>
            {game.reviews?.map((review: Review) => (
              <Card key={review.reviewId} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>User Review:</Typography>
                  <Typography variant="body1">{review.comment}</Typography>
                  <Typography variant="body2">{`Score: ${review.score}`}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default GameDetail;
