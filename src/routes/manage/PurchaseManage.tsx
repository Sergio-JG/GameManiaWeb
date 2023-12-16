import axios from 'axios';
import { Purchase } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const PurchaseManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/purchase';

    const [purchase, setPurchases] = useState<Purchase[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log(response.data)
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };

        fetchSales();
    }, []);

    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de compras </Typography>
            </Grid>
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '61vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Fecha de realizacion</TableCell>
                                <TableCell>Detalles de compra</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchase.slice((page - 1) * 9, page * 9).map((purchase: Purchase) => (
                                <TableRow key={purchase.purchaseId}>
                                    <TableCell> {purchase.firstName} {purchase.secondName} </TableCell>
                                    <TableCell> {purchase.purchaseDate} </TableCell>
                                    <TableCell> Purchase details </TableCell>
                                    <TableCell> {purchase.totalAmount} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(purchase.length / 9)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
            </Grid>
            <FooterAdmin />
        </div>
    );
};

export default PurchaseManage;
