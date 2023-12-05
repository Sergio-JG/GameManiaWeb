import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, Grid, Pagination, Button } from '@mui/material';
import Game from '../../interfaces/GameInterface';
import HeaderAdmin from '../../components/HeaderAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import CreateGameForm from '../../components/CreateGameForm';
import DescriptionDialog from '../../components/DescriptionDialog';

const GameManage: React.FC = () => {

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const API_URL = 'http://localhost:8080/game';

    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

    const handleFormClose = () => {
        setOpen(false);
        fetchGames();
    };

    const fetchGames = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const gameData = await response.json();
            setGames(gameData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const handleFormOpen = () => {
        setOpen(true);
    };

    useEffect(() => { fetchGames(); }, []);

    return (
        <div>
            <HeaderAdmin />
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '69vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Fecha de salida</TableCell>
                                <TableCell>Número de ventas</TableCell>
                                <TableCell>Stock disponible</TableCell>
                                <TableCell>Puntuacion total</TableCell>
                                <TableCell>Plataforma</TableCell>
                                <TableCell>Genero</TableCell>
                                <TableCell>Reviews</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games
                                .slice((page - 1) * 9, page * 9)
                                .map((game: Game) => (
                                    <TableRow key={game.gameId}>
                                        <TableCell>{game.title}</TableCell>
                                        <TableCell>{game.price} € </TableCell>
                                        <TableCell onClick={() => setSelectedDescription(game.description)}>
                                            {game.description.length > 20 ? `${game.description.slice(0, 20)}...` : game.description}
                                        </TableCell>
                                        <TableCell>{game.releaseDate}</TableCell>
                                        <TableCell>{game.numberOfSales}</TableCell>
                                        <TableCell>{game.stock}</TableCell>
                                        <TableCell>
                                            <Rating
                                                name={`score-${game.gameId}`}
                                                value={game.totalScore}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell>{'platforms'}</TableCell>
                                        <TableCell>{'genres'}</TableCell>
                                        <TableCell>{'reviews'}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(games.length / 9)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
                <Grid container justifyContent="flex-end" paddingY={2} height={40}>
                    <Button onClick={handleFormOpen} variant="contained" color="success"> Crear </Button>
                </Grid>
            </Grid>
            <FooterAdmin />
            <DescriptionDialog description={selectedDescription} onClose={() => setSelectedDescription(null)} />
            <CreateGameForm open={open} onClose={handleFormClose} />
        </div>
    );
};

export default GameManage;

