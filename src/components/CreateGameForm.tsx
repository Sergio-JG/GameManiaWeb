import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Modal, Typography, Grid, } from '@mui/material';
import { Game } from '../interfaces/GameInterface';
import axios from 'axios';

type OpenGameFormProps = {
    open: boolean;
    onClose: () => void;
};

const CreateGameForm = ({ open, onClose }: OpenGameFormProps) => {

    const API_URL = 'http://localhost:8080/game';

    const [formData, setFormData] = useState<Game>({
        title: '',
        price: 0,
        description: '',
        releaseDate: '',
        stock: 0,
        genres: [],
        platforms: [],
    });

    const [errors, setErrors] = React.useState({
        passwordError: '',
        emailError: '',
        firstName: '',
        lastName: '',
        generalError: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid component="form" onSubmit={handleSubmit} noValidate sx={{ border: 'solid', bgcolor: 'white' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <Typography variant='h3' sx={{ padding: 3 }}> AÑADIR NUEVO JUEGO </Typography>
                    <Typography> Titulo </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        fullWidth
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Precio </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="price"
                        fullWidth
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Descripcion </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="description"
                        fullWidth
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Fecha de lanzamiento </Typography>
                    <TextField
                        type='date'
                        margin="normal"
                        required
                        id="releaseDate"
                        fullWidth
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Typography> Stock </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="stock"
                        fullWidth
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        sx={{ bgcolor: 'white', width: 400 }}
                    />
                    <Grid justifyContent={'space-evenly'} paddingTop={2}>
                        <Button color='success' type="submit" variant="contained" sx={{ mx: 5 }}> Añadir </Button>
                        <Button color='error' onClick={onClose} variant="contained" sx={{ mx: 5 }}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal >
    );
};

export default CreateGameForm;

