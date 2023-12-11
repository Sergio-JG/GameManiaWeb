import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Divider } from '@mui/material';
import { CreditCard, User } from '../interfaces/GameInterface';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {

  const [userData, setUserData] = useState<User | null>({});
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState<User>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        const result = response.data;
        if (!editMode) {
          setUserData(result[0]);
        }
      } catch (error) {
        console.error('ERROR fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDataChange = (field: string, value: string) => {
    if (editedUserData) {
      setEditedUserData({
        ...editedUserData,
        [field]: value,
      });
      console.log(field + "     " + value);
      console.log(editedUserData);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUserData(null);
  };

  const handleSubmit = async () => {

    console.log("submited data" + JSON.stringify(editedUserData));

    // try {
    //   const response = await axios.post('http://localhost:8080/user', editedUserData, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (response.status == 200) {
    //     console.log("AAA")
    //   }
    // } catch (error) {
    //   console.error('ERROR submitting data:', error);
    // }
  };


  return (
    <>
      <Header />
      <Grid container padding={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" align="center" gutterBottom>
            User Profile
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  label="First Name"
                  value={editedUserData?.firstName}
                  onChange={(e) => handleDataChange('firstName', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  First Name: {userData?.firstName || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  label="Last Name"
                  value={editedUserData?.lastName}
                  onChange={(e) => handleDataChange('lastName', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Last Name: {userData?.lastName || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Email"
                  value={editedUserData?.email}
                  onChange={(e) => handleDataChange('email', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Email: {userData?.email || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Social Media</Typography>
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Discord Tag"
                  value={editedUserData?.social?.discordTag}
                  onChange={(e) => handleDataChange('discordTag', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Discord Tag: {userData?.social?.discordTag || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Steam URL"
                  value={editedUserData?.social?.steamUrl}
                  onChange={(e) => handleDataChange('steamUrl', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Steam URL: {userData?.social?.steamUrl || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Twitch URL"
                  value={editedUserData?.social?.twitchUrl}
                  onChange={(e) => handleDataChange('twitchUrl', e.target.value)}
                  fullWidth
                />
              ) : (<Typography>
                Twitch URL: {userData?.social?.twitchUrl || 'No hay datos'}
              </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="YouTube URL"
                  value={editedUserData?.social?.youtubeUrl}
                  onChange={(e) => handleDataChange('youtubeUrl', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  YouTube URL: {userData?.social?.youtubeUrl || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address Information</Typography>
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Ciudad"
                  value={editedUserData?.address?.city}
                  onChange={(e) => handleDataChange('city', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  City: {userData?.address?.city || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Pais"
                  value={editedUserData?.address?.country}
                  onChange={(e) => handleDataChange('country', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Country: {userData?.address?.country || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Codigo postal"
                  value={editedUserData?.address?.postalCode}
                  onChange={(e) => handleDataChange('postalCode', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Postal Code: {userData?.address?.postalCode || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Estado"
                  value={editedUserData?.address?.state}
                  onChange={(e) => handleDataChange('state', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  State: {userData?.address?.state || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  label="Direccion de facturacion"
                  value={editedUserData?.address?.streetAddress}
                  onChange={(e) => handleDataChange('streetAddress', e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography>
                  Street Address: {userData?.address?.streetAddress || 'No hay datos'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Credit Cards</Typography>
            </Grid>
            {userData?.creditCard?.length ? (
              userData?.creditCard?.map((card: CreditCard, index: number) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="h6">
                    Credit Card {index + 1}:
                  </Typography>
                  <Typography>
                    Card Number: {card.cardNumber || 'No hay datos'}
                  </Typography>
                  <Typography>
                    Card Holder Name: {card.cardHolderName || 'No hay datos'}
                  </Typography>
                  <Typography>
                    Expiration Date: {card.expirationDate || 'No hay datos'}
                  </Typography>
                  <Typography>CVV: {card.cvv || 'No hay datos'}</Typography>
                  <Typography>
                    Billing Address: {card.billingAddress || 'No hay datos'}
                  </Typography>
                  <Divider />
                  <Button onClick={handleEdit}>
                    {editMode ? 'Cancel' : 'Edit'}
                  </Button>
                  {editMode && (
                    <Button onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No hay datos de tarjetas de crédito</Typography>
              </Grid>
            )}
          </Grid>
          {editMode ? (
            <Grid container justifyContent="space-between" padding={2}>
              <Grid item>
                <Button variant="contained" onClick={handleSubmit}>Aceptar</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleCancelEdit}>Cancelar</Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="space-between" padding={2}>
              <Grid item>
                <Button variant="contained" onClick={handleEdit}>Edit</Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Profile;
