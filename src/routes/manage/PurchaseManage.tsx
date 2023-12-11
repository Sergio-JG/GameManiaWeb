import axios from 'axios';
import { Purchase, PurchaseDetail } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const SaleManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/purchase';

    const [sales, setSales] = useState<Purchase[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log(response.data)
                setSales(response.data);
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
                            {sales.map((purchase: Purchase) => (
                                <TableRow key={purchase.purchaseId}>
                                    <TableCell> {purchase.firstName} {purchase.secondName} </TableCell>
                                    <TableCell> {purchase.purchaseDate} </TableCell>
                                    <TableCell> Purchase details </TableCell>
                                    <TableCell> {purchase.totalAmount} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(sales.length / 9)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
            </Grid>
            <FooterAdmin />
        </div>
    );
};

export default SaleManage;
