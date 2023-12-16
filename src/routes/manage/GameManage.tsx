import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, Grid, Pagination, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { Game, Provider } from '../../interfaces/GameInterface';
import HeaderAdmin from '../../components/HeaderAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import CreateGameForm from '../../components/CreateGameForm';
import DescriptionDialog from '../../components/DescriptionDialog';

const API_URL = 'http://localhost:8080/game';
const API_URL_PROVIDERS = 'http://localhost:8080/provider';
const API_URL_PURCHASE = 'http://localhost:8080/purchase';

const GameManage: React.FC = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);


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

    const fetchProviders = async () => {
        try {
            const response = await fetch(API_URL_PROVIDERS);
            if (!response.ok) {
                throw new Error('Failed to fetch proveedores');
            }
            const providersData = await response.json();
            setProviders(providersData);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => { fetchGames(); fetchProviders(); }, []);

    const handleOpenDialog = (game: Game) => {
        setSelectedGame(game);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedGame(null);
        setQuantity(1);
    };

    const handlePurchase = async () => {

        const purchaseData = {
            providerId: selectedProvider?.providerId || "",
            purchaseDate: new Date(),
            purchaseDetail: [
                {
                    gameId: selectedGame?.gameId || "",
                    quantity: quantity,
                    subtotal: selectedGame?.price !== undefined ? selectedGame.price * quantity : 0,
                },
            ],
        };

        const newStock = selectedGame?.stock ? selectedGame.stock + stock : stock;
        if (selectedGame) {
            selectedGame.stock = newStock as number;
        }

        try {
            const response = await fetch(`${API_URL}/${selectedGame?.gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedGame),
            });

            if (response.ok) {
                console.log("update")
            }

        } catch (error) {
            console.error('Error updating stock:', error);
        }

        try {
            const response = await fetch(API_URL_PURCHASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (response.ok) {
                console.log("Purchase created successfully");
            } else {
                console.error("Failed to create purchase");
            }
        } catch (error) {
            console.error('Error creating purchase:', error);
        }

        handleCloseDialog();
    };

    const handleFormOpen = () => {
        setOpen(true);
    };

    const handleFormClose = () => {
        setOpen(false);
        fetchGames();
    };

    function handleProviderChange(event: any): void {
        const { value } = event.target;
        const selectedProvider = providers.find((provider: Provider) => provider.providerId === value);
        setSelectedProvider(selectedProvider || null);
    }

    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de juegos </Typography>
            </Grid>
            <Grid paddingX={5}>
                <TableContainer component={Paper} sx={{ minHeight: '60vh' }}>
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
                                <TableCell></TableCell>
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
                                        <TableCell>
                                            <Button onClick={() => handleOpenDialog(game)} variant="contained" color="primary">
                                                Comprar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(games.length / 9)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
                <Grid container justifyContent="flex-end" paddingX={2} height={40}>
                    <Button onClick={handleFormOpen} variant="contained" color="success"> Crear </Button>
                </Grid>
            </Grid>
            <FooterAdmin />
            <DescriptionDialog description={selectedDescription} onClose={() => setSelectedDescription(null)} />
            <CreateGameForm open={open} onClose={handleFormClose} />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Comprar {selectedGame?.title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label="Cantidad"
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                variant='filled'
                                label="Proveedor"
                                value={selectedProvider?.providerId}
                                onChange={handleProviderChange}
                                fullWidth
                            >
                                {providers.map((provider: Provider) => (
                                    <MenuItem key={provider.providerId} value={provider.providerId}>
                                        {provider.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error" variant='contained'>
                        Cancelar
                    </Button>
                    <Button onClick={handlePurchase} color="success" variant='contained'>
                        Comprar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GameManage;

