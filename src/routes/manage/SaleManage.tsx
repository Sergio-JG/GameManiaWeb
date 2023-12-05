import axios from 'axios';
import Sale from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Pagination } from '@mui/material';
import { useState, useReducer, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const SaleManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/sale';

    type StateType = {
        openAddressPopup: boolean;
        openRolePopup: boolean;
        openSocialPopup: boolean;
        selectedSale: Sale | null;
    };

    type ActionType =
        | { type: 'OPEN_ADDRESS_POPUP'; payload: Sale }
        | { type: 'CLOSE_ADDRESS_POPUP' }
        | { type: 'OPEN_ROLE_POPUP'; payload: Sale }
        | { type: 'CLOSE_ROLE_POPUP' }
        | { type: 'OPEN_SOCIAL_POPUP'; payload: Sale }
        | { type: 'CLOSE_SOCIAL_POPUP' };


    const [sales, setSales] = useState<Sale[]>([]);
    const [editedSale, setEditedSale] = useState<Sale>();
    const [editMode, setEditMode] = useState(false);
    const [page, setPage] = useState(1);

    const handleEdit = (sale: Sale) => {
        setEditedSale(sale);
        setEditMode(true);
    };

    const initialState = {
        openAddressPopup: false,
        openRolePopup: false,
        openSocialPopup: false,
        selectedSale: null
    };

    const reducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'OPEN_ADDRESS_POPUP':
                return { ...state, openAddressPopup: true, selectedSale: action.payload };
            case 'CLOSE_ADDRESS_POPUP':
                return { ...state, openAddressPopup: false, selectedSale: null };
            case 'OPEN_ROLE_POPUP':
                return { ...state, openRolePopup: true, selectedSale: action.payload };
            case 'CLOSE_ROLE_POPUP':
                return { ...state, openRolePopup: false, selectedSale: null };
            case 'OPEN_SOCIAL_POPUP':
                return { ...state, openSocialPopup: true, selectedSale: action.payload };
            case 'CLOSE_SOCIAL_POPUP':
                return { ...state, openSocialPopup: false, selectedSale: null };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(API_URL);
                setSales(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };

        fetchSales();
    }, []);

    const handleSocialPopUp = (sale: Sale) => {
        dispatch({ type: 'OPEN_SOCIAL_POPUP', payload: sale });
    };

    const handleRolePopUp = (sale: Sale) => {
        dispatch({ type: 'OPEN_ROLE_POPUP', payload: sale });
    };

    const handleAddressPopUp = (sale: Sale) => {
        dispatch({ type: 'OPEN_ADDRESS_POPUP', payload: sale });
    };

    const handleAddressPopUpClose = () => {
        dispatch({ type: 'CLOSE_ADDRESS_POPUP' });
    };

    const handleRolePopUpClose = () => {
        dispatch({ type: 'CLOSE_ROLE_POPUP' });
    };

    const handleSocialPopUpClose = () => {
        dispatch({ type: 'CLOSE_SOCIAL_POPUP' });
    };

    const handleSubmit = () => {
        console.log(editedSale)
        if (false) {
            axios.put(API_URL)
                .then((response) => {
                    // Handle the response
                })
                .catch((error) => {
                    // Handle the error
                });
        }
    };

    const handleCancel = () => {
        setEditedSale(null);
        setEditMode(false);
    };

    function handleFirstNameChange(value: string): void {
    }

    function handleLastNameChange(value: string): void {
    }

    function handlePhoneChange(value: string): void {
    }

    function handleFormOpen(event: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            <HeaderAdmin />
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '69vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.map((sale: Sale) => (
                                <TableRow key={sale.saleId}>
                                    <TableCell>{sale.saleDate}</TableCell>
                                    <TableCell> {sale.totalAmount} </TableCell>
                                    <TableCell>sale details</TableCell>
                                    {editMode && sale.saleId == editedSale?.saleId ? (
                                        <>
                                            <TableCell>
                                                <Button onClick={handleSubmit} variant="contained" color="primary"> Save </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={handleCancel} variant="contained" color="secondary"> Cancel </Button>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(sale)} variant="contained" color="secondary"> Modify </Button>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </>
                                    )}
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
                <Grid container justifyContent="flex-end" paddingY={2} height={40}>
                    <Button onClick={handleFormOpen} variant="contained" color="success"> Crear </Button>
                </Grid>
            </Grid>
            <FooterAdmin />
        </div>
    );
};

export default SaleManage;
