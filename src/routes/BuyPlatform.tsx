import { Button, Grid, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BuyPlatform = () => {
    const cart = [/* Your cart items */];

    const handleConfirmPurchase = () => {
        console.log('Purchase confirmed!');
    };

    return (
        <>
            <Header />
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="h3">Confirm Purchase</Typography>
                </Grid>
                {/* Display order details or summary */}
                <Grid item>
                    {/* Replace with actual order details */}
                    <Typography variant="body1">Your Order Details</Typography>
                    {/* Iterate through the cart and display details */}
                    {cart.map((item, index) => (
                        <Grid container key={index} spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Typography variant="subtitle1">{item.title}</Typography>
                                <Typography variant="body2">{`Price: $${item.price}`}</Typography>
                                {/* Add more details */}
                                {/* ... */}
                            </Grid>
                            <Grid item>
                                {/* Add an image or any other details */}
                                <img src={item.image} alt={item.title} />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                {/* Button to confirm purchase */}
                <Grid item>
                    <Button variant="contained" onClick={handleConfirmPurchase}>
                        Confirm Purchase
                    </Button>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default BuyPlatform;
