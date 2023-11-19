import { Avatar, Button, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import ShirtImage from '../images/default.jpg';

import GameInterface from '../interfaces/GameInterface';
interface CartComponentProps {
    open: boolean;
    onClose: () => void;
    cart: GameInterface[];
}

const CartComponent: React.FC<CartComponentProps> = ({ cart, open, onClose }) => {

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price, 0);
    };

    const drawerHeight = 300 + cart.length * 80;

    if (cart.length === 0) {

        return (
            <Drawer

                open={open}
                onClose={onClose}
                anchor='right'
                PaperProps={{
                    sx: {
                        width: 400,
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        height: `${drawerHeight}px`,
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

        open={open}
        onClose={onClose}
        anchor='right'
        PaperProps={{
            sx: {
                width: 400,
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: `${drawerHeight}px`,
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
                            <Avatar src={ShirtImage} />
                        </ListItemAvatar>
                        <ListItemText primary={item.title} />
                        <Typography variant="h6">{`$${item.price}`}</Typography>
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
                <h3>${getTotalPrice()}</h3>
            </Grid>
        </Grid>


        <Grid container justifyContent="space-between" padding={2}>
            <Grid item>
                <Button variant="outlined" color="secondary"> Ver cesta </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary"> Confirmar compra </Button>
            </Grid>
        </Grid>


    </Drawer >
};

export default CartComponent;

