import { Avatar, Card, CardContent, CardHeader, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Game from '../interfaces/GameInterface';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/game/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setGame(result);
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
              <CardContent>
                <Typography variant="h5" gutterBottom>Description:</Typography>
                <Typography variant="body1">{game?.description}</Typography>
                <Typography variant="h6" gutterBottom>Release Date:</Typography>
                <Typography variant="body1">{game?.releaseDate}</Typography>
                <Typography variant="h6" gutterBottom>Genres:</Typography>
                <div>
                  {game?.genres.map((genre) => (
                    <Chip key={genre.genreId} label={genre.name} style={{ marginRight: '5px' }} />
                  ))}
                </div>
                <Typography variant="h6" gutterBottom>Platforms:</Typography>
                <div>
                  {game?.platforms.map((platform) => (
                    <Chip key={platform.platformId} label={platform.name} style={{ marginRight: '5px' }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Typography variant="h4" gutterBottom>Reviews</Typography>
            {game?.reviews.map((review) => (
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
