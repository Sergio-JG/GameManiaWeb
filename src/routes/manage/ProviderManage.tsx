import { Provider } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CreateProviderForm from '../../components/CreateProviderForm';
import FooterAdmin from '../../components/FooterAdmin';

const ProviderManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/provider';

    const [providers, setProviders] = useState<[]>([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const handleFormClose = () => {
        setOpen(false);
        fetchProviders();
    };

    const fetchProviders = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch providers');
            }
            const providersData = await response.json();
            if (validateProvidersData(providersData)) {
                setProviders(providersData);
            } else {
                throw new Error('Invalid providers data');
            }
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    };

    const validateProvidersData = (data: any) => {
        console.log(data)
        return true;
    };

    useEffect(() => { fetchProviders(); }, []);

    function handleAccountPopUp(provider: Provider): void {
        throw new Error('Function not implemented.');
    }

    const handleFormOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de proveedores </Typography>
            </Grid>
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '58vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Mail</TableCell>
                                <TableCell>Account</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {providers
                                .slice((page - 1) * 9, page * 9)
                                .map((provider: Provider) => (
                                    <TableRow key={provider.providerId}>
                                        <TableCell>{provider.name}</TableCell>
                                        <TableCell>{provider.address}</TableCell>
                                        <TableCell>{provider.phone}</TableCell>
                                        <TableCell>{provider.email}</TableCell>
                                        <TableCell onClick={provider.account ? () => handleAccountPopUp(provider) : undefined}>
                                            {provider.account ? 'ver social...' : 'No hay datos'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(providers.length / 9)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
                <Grid container justifyContent="flex-end" paddingY={2} height={40}>
                    <Button onClick={handleFormOpen} variant="contained" color="success">Crear</Button>
                </Grid>
            </Grid>
            <FooterAdmin />
            <CreateProviderForm open={open} onClose={handleFormClose} />
        </div >
    );
};

export default ProviderManage;
