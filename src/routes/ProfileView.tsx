import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Divider } from '@mui/material';
import { CreditCard, User } from '../interfaces/GameInterface';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {

  const [userData, setUserData] = useState<User | null>(null);
  // const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/2f8289d1-88ae-11ee-a415-fc3497a6b8ff');
      if (!response.ok) {
        throw new Error('ERROR');
      }
      const result = await response.json();
      console.log(result);
      setUserData(result[0]);
    } catch (error) {
      console.error('ERROR fetching data:', error);
    }
  };

  return (
    <>
      <Header />
      <Grid container padding={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" align="center" gutterBottom> User Profile </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>First Name: {userData?.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Last Name: {userData?.lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email: {userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Social Media</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Discord Tag: {userData?.social?.discordTag}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Steam URL: {userData?.social?.steamUrl}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Twitch URL: {userData?.social?.twitchUrl}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>YouTube URL: {userData?.social?.youtubeUrl}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>City: {userData?.address?.city}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Country: {userData?.address?.country}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Postal Code: {userData?.address?.postalCode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>State: {userData?.address?.state}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Street Address: {userData?.address?.streetAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Credit Cards</Typography>
            </Grid>
            {userData?.creditCard?.map((card: CreditCard, index: number) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">Credit Card {index + 1}:</Typography>
                <Typography>Card Number: {card.cardNumber}</Typography>
                <Typography>Card Holder Name: {card.cardHolderName}</Typography>
                <Typography>Expiration Date: {card.expirationDate}</Typography>
                <Typography>CVV: {card.cvv}</Typography>
                <Typography>Billing Address: {card.billingAddress}</Typography>
                <Divider />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Profile;
