import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const entityData = [
  { name: 'Address', route: '/dashboard/address' },
  { name: 'CreditCard', route: '/dashboard/creditcard' },
  { name: 'Game', route: '/dashboard/game' },
  { name: 'Genre', route: '/dashboard/genre' },
  { name: 'Platform', route: '/dashboard/platform' },
  { name: 'Provider', route: '/dashboard/provider' },
  { name: 'Purchase', route: '/dashboard/purchase' },
  { name: 'Role', route: '/dashboard/role' },
  { name: 'Sale', route: '/dashboard/sale' },
  { name: 'User', route: '/dashboard/user' },
];

const HomeAdmin: React.FC = () => {

  const navigate = useNavigate();

  const handleLogOf = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to Admin Panel</h1><Button onClick={handleLogOf}>
        Cerrar sesion
      </Button>
      <div>
        {entityData.map((entity) => (
          <Link to={entity.route} key={entity.name} style={{ textDecoration: 'none' }}>
            <Card style={{ margin: '10px', width: '200px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {entity.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeAdmin;

function setUserId(undefined: undefined) {
  throw new Error('Function not implemented.');
}
