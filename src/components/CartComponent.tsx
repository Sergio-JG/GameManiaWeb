import { Avatar, Button, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import defaultPic from '../images/default.jpg';

import { useContext } from 'react';
import { CartContext } from '../interfaces/CartContext';

const CartComponent = () => {

    const { cart, toggleCart, isCartOpen, getTotalPrice } = useContext(CartContext);
    const drawerHeight = 300 + cart.length * 80;

    if (cart.length === 0) {

        return (
            <Drawer

                open={isCartOpen}
                onClose={toggleCart}
                anchor='right'
                PaperProps={{
                    sx: {
                        width: 400,
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        height: `${drawerHeight}px`,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }
                }}>

                <div style={{ textAlign: 'center', margin: '16px' }}>
                    <h1>Mi cesta</h1>
                </div>

                <Divider />

                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <h3>No hay elementos en la cesta</h3>
                </div>
            </Drawer>
        );
    }

    return <Drawer
        open={isCartOpen}
        onClose={toggleCart}
        anchor='right'
        PaperProps={{
            sx: {
                width: 420,
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: `${drawerHeight}px`,
                maxHeight: '100vh',
                overflowY: 'auto',
            }
        }}>

        <div style={{ textAlign: 'center', margin: '15px' }}>
            <h1>Mi cesta ({cart.length})</h1>
        </div>

        <Divider />

        <List sx={{ flexGrow: 1 }}>
            {cart.map((item, index) => (
                <div key={index}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={defaultPic} />
                        </ListItemAvatar>
                        <ListItemText primary={item.title} />
                        <Typography variant="h6">{`$${item.price}`}</Typography>
                        <Typography variant="body1">{`(${item.quantity})`}</Typography>
                    </ListItem>
                </div>
            ))}
        </List>

        <Divider />

        <Grid container justifyContent="space-between" padding={2}>
            <Grid item xs={6}>
                <h3>Subtotal:</h3>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <h3>${getTotalPrice().toFixed(2)}</h3>
            </Grid>
        </Grid>

        <Grid container justifyContent="space-between" padding={2}>
            <Grid item>
                <Button variant="outlined" href="/cartDetailView"> Ver Cesta </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" href="/buyPlatform"> Confirmar Compra </Button>
            </Grid>
        </Grid>
    </Drawer >
};

export default CartComponent;

