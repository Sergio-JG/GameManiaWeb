import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../components/CartContext';
import GameInterface, { User, Address, CreditCard } from '../interfaces/GameInterface';
import { ArrowRight } from '@mui/icons-material';
import defaultPic from '../images/default.jpg';

const BuyPlatform = () => {

    const { cart, getTotalPrice } = useContext(CartContext);
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/2f8289d1-88ae-11ee-a415-fc3497a6b8ff');
                if (response.ok) {
                    const data = await response.json();
                    const formattedUserData: User = {
                        userId: data[0].userId,
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        email: data[0].email,
                        username: data[0].username,
                        phone: data[0].phone,
                        profilePic: data[0].profilePic,
                        password: data[0].password,
                        socialId: data[0].socialId,
                        social: {
                            socialId: data[0].social.socialId,
                            steamUrl: data[0].social.steamUrl,
                            twitchUrl: data[0].social.twitchUrl,
                            youtubeUrl: data[0].social.youtubeUrl,
                            discordTag: data[0].social.discordTag
                        },
                        roleId: data[0].roleId,
                        role: {
                            roleId: data[0].role.roleId,
                            name: data[0].role.name
                        },
                        addressId: data[0].addressId,
                        address: {
                            addressId: data[0].address.addressId,
                            streetAddress: data[0].address.streetAddress,
                            city: data[0].address.city,
                            state: data[0].address.state,
                            postalCode: data[0].address.postalCode,
                            country: data[0].address.country
                        },
                        creditCard: data[0].creditCard
                    };

                    setUserData(formattedUserData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const generateSaleData = (cart: GameInterface[]) => {

        const userId = "2f8289d1-88ae-11ee-a415-fc3497a6b8ff";
        const saleDate = new Date().toISOString().split('T')[0];

        const saleDetail = cart.map((item) => ({
            gameId: item.gameId,
            quantity: item.quantity,
            subtotal: item.price,
        }));

        return {
            userId,
            saleDate,
            saleDetail,
        };
    };

    const handleConfirmSale = async () => {

        let saleData = generateSaleData(cart);
        console.log(saleData);

        try {

            const response = await fetch('http://localhost:8080/sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            });
            if (response.ok) {
                console.log('Sale confirmed!');
            } else {
                console.error('Failed to confirm sale');
            }
        } catch (error) {
            console.error('Error confirming sale:', error);

        };
    };

    const renderAddressDetails = (address: Address) => {
        return (
            <>
                <Grid container style={{ textAlign: 'left', margin: '20px' }}>
                    <Typography variant="h5">Dirección de envio</Typography>
                    <Button variant="outlined" /* onClick={handleChangeAddress} */ style={{ marginLeft: '20px' }}>
                        Change Address
                    </Button>
                </Grid>
                <Grid container style={{ textAlign: 'left', margin: '30px' }}>
                    <List>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Street: {address.streetAddress}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">City: {address.city}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">State: {address.state}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Postal Code: {address.postalCode}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Country: {address.country}</Typography>
                        </ListItem>
                    </List>
                </Grid>
            </>
        );
    };

    const renderCreditCardDetails = (card: CreditCard[]) => {
        return (
            <>
                <Grid container style={{ textAlign: 'left', margin: '20px' }}>
                    <Typography variant="h5">Dirección de envio</Typography>
                    <Button variant="outlined" /* onClick={handleChangeAddress} */ style={{ marginLeft: '20px' }}>
                        Change Address
                    </Button>
                </Grid>
                <Grid container style={{ textAlign: 'left', margin: '30px' }}>
                    <List>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }} />
                            <Typography variant="body1">Card Number: {card[0].cardNumber}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Cardholder Name: {card[0].cardHolderName}</Typography>
                        </ListItem >
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Expiration Date: {card[0].expirationDate}</Typography>
                        </ListItem >
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">CVV: {card[0].cvv}</Typography>
                        </ListItem >
                        <ListItem>
                            <ArrowRight style={{ color: 'black' }}></ArrowRight>
                            <Typography variant="body1">Billing Address: {card[0].billingAddress}</Typography>
                        </ListItem >
                    </List >
                </Grid>
            </>
        );
    };

    return (
        <>
            <Header />
            <Grid container sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={6} md={7}>
                    <Grid direction="column" alignItems="center" justifyContent="center" style={{ width: '100%', border: 'solid black', padding: 20, margin: 20 }}>
                        <Grid item display='flex' alignItems="center" justifyContent="left" margin='25px'>
                            <Typography variant="h3">Confirm Sale</Typography>
                        </Grid>
                        {userData && (
                            <>
                                <Box border={1} borderRadius={4} borderColor="grey.400" marginBottom={2}>
                                    {renderAddressDetails(userData.address)}
                                </Box>

                                <Box border={1} borderRadius={4} borderColor="grey.400" marginBottom={2}>
                                    {renderCreditCardDetails(userData.creditCard)}
                                </Box>
                            </>
                        )}
                    </Grid >
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Grid direction="column" alignItems="center" justifyContent="center" style={{ height: '85.8%', width: '100%', border: 'solid black', padding: 20, margin: 20 }}>
                        <Grid item display='flex' alignItems="center" justifyContent="left" margin='25px'>
                            <Typography variant="h3"> Carrito de compra </Typography>
                        </Grid>
                        {cart && (
                            <>
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
                                </List><Divider /><Grid container justifyContent="space-between" padding={2}>
                                    <Grid item xs={6}>
                                        <h3>Subtotal:</h3>
                                    </Grid>
                                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                        <h3>${getTotalPrice().toFixed(2)}</h3>
                                    </Grid>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent="space-between">
                                    <Button variant="contained" color="warning" href="/" style={{ width: '40%' }} >
                                        Cancel Sale
                                    </Button>
                                    <Button variant="contained" onClick={handleConfirmSale} style={{ width: '40%' }}>
                                        Confirm Sale
                                    </Button>
                                </Grid>
                            </>

                        )}
                    </Grid >
                </Grid>
            </Grid >
            <Footer />
        </>
    );
};

export default BuyPlatform;

