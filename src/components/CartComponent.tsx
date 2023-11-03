import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider } from '@mui/material';
import ShirtImage from '../images/default.jpg';
import { useState } from 'react';


interface CartComponentProps {
    open: boolean;
    onClose: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ open, onClose }) => {

    interface Game {
        gameId: string;
        title: string;
        price: number;
        description: string;
    }

    const [items, setItems] = useState<Game[]>([]);

    const getTotalPrice = () => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    return <Drawer

        open={open}
        onClose={onClose}
        anchor='right'
        PaperProps={{
            sx: {
                width: 500,
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: `500px`,
            }
        }}>

        <div style={{ textAlign: 'center', margin: '16px' }}>
            <h1>Mi cesta</h1>
        </div>
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <h3>No hay elementos en la cesta</h3>
        </div>
        <List sx={{ flexGrow: 1 }}>
            {items.map((item, index) => (
                <div key={index}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={ShirtImage} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.title}
                            secondary={`Price: $${item.price} - ${item.description}`}
                        />
                    </ListItem>
                </div>
            ))}
        </List>
        <Divider style={{ marginTop: '8px' }} />
        <div style={{ padding: '8px' }}>
            <h3>Total: ${getTotalPrice()}</h3>
            <Button variant="contained" color="primary" fullWidth>
                Confirm Purchase
            </Button>
        </div>
    </Drawer>
};

export default CartComponent;

