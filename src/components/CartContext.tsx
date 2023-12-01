import { Avatar, Button, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import GameInterface from '../interfaces/GameInterface';

export const CartContext = createContext<{
    cart: GameInterface[];
    setCart: React.Dispatch<React.SetStateAction<GameInterface[]>>;
    isCartOpen: boolean;
    addToCart: (game: GameInterface) => void;
    toggleCart: () => void;
    getTotalPrice: () => number;
    totalItemsInCart: number;
}>({
    cart: [],
    setCart: () => { },
    isCartOpen: false,
    addToCart: () => { },
    toggleCart: () => { },
    getTotalPrice: () => 0,
    totalItemsInCart: 0,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState<GameInterface[]>(cartFromLocalStorage);
    const drawerHeight = 300 + cart.length * 80;
    const [isCartOpen, setCartOpen] = useState(false);

    const saveCartToLocalStorage = (cartData: GameInterface[]) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    const addToCart = (game: GameInterface) => {
        const existingGame = cart.find((item) => item.gameId === game.gameId);

        if (existingGame) {
            const updatedCart = cart.map((item) =>
                item.gameId === game.gameId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
        } else {
            const newCart = [...cart, { ...game, quantity: 1 }];
            setCart(newCart);
            saveCartToLocalStorage(newCart);
        }
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const toggleCart = () => {
        setCartOpen((prevIsCartOpen) => !prevIsCartOpen);
    };

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                isCartOpen,
                addToCart,
                toggleCart,
                getTotalPrice,
                totalItemsInCart,
            }}
        >
            {children}

            <Drawer
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
                    },
                }}
            >

                <div style={{ textAlign: 'center', margin: '15px' }}>
                    <h1>Mi cesta ({cart.length})</h1>
                </div>

                <Divider />

                <List sx={{ flexGrow: 1 }}>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={item.image} />
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
                        <Button variant="outlined" href="/cartDetailView">
                            Ver Cesta
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" href="/buyPlatform">
                            Confirmar Compra
                        </Button>
                    </Grid>
                </Grid>
            </Drawer>
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    return useContext(CartContext);
};