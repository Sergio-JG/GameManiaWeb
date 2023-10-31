import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const GameDetail = () => {
  const { id } = useParams(); // Assuming you are passing the game ID through the URL

  const [game, setGame] = useState<any>(null); // Set an initial state with 'any' type

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
    <Container maxWidth="lg" style={{ padding: '16px' }}>
      <Typography variant="h4">{game?.title}</Typography>
      <Typography variant="body1">Price: ${game?.price}</Typography>
      <Typography variant="body1">Description: {game?.description}</Typography>
      <Typography variant="body1">Release Date: {game?.releaseDate}</Typography>
    </Container>
  );
};

export default GameDetail;
