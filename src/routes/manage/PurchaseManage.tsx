import axios from 'axios';
import Purchase from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Pagination } from '@mui/material';
import { useState, useReducer, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const PurchaseManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/purchase';

    type StateType = {
        openAddressPopup: boolean;
        openRolePopup: boolean;
        openSocialPopup: boolean;
        selectedPurchase: Purchase | null;
    };

    type ActionType =
        | { type: 'OPEN_ADDRESS_POPUP'; payload: Purchase }
        | { type: 'CLOSE_ADDRESS_POPUP' }
        | { type: 'OPEN_ROLE_POPUP'; payload: Purchase }
        | { type: 'CLOSE_ROLE_POPUP' }
        | { type: 'OPEN_SOCIAL_POPUP'; payload: Purchase }
        | { type: 'CLOSE_SOCIAL_POPUP' };


    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [editedPurchase, setEditedPurchase] = useState<Purchase>();
    const [editMode, setEditMode] = useState(false);
    const [page, setPage] = useState(1);

    const handleEdit = (purchase: Purchase) => {
        setEditedPurchase(purchase);
        setEditMode(true);
    };

    const initialState = {
        openAddressPopup: false,
        openRolePopup: false,
        openSocialPopup: false,
        selectedPurchase: null
    };

    const reducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'OPEN_ADDRESS_POPUP':
                return { ...state, openAddressPopup: true, selectedPurchase: action.payload };
            case 'CLOSE_ADDRESS_POPUP':
                return { ...state, openAddressPopup: false, selectedPurchase: null };
            case 'OPEN_ROLE_POPUP':
                return { ...state, openRolePopup: true, selectedPurchase: action.payload };
            case 'CLOSE_ROLE_POPUP':
                return { ...state, openRolePopup: false, selectedPurchase: null };
            case 'OPEN_SOCIAL_POPUP':
                return { ...state, openSocialPopup: true, selectedPurchase: action.payload };
            case 'CLOSE_SOCIAL_POPUP':
                return { ...state, openSocialPopup: false, selectedPurchase: null };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get(API_URL);
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    const handleSocialPopUp = (purchase: Purchase) => {
        dispatch({ type: 'OPEN_SOCIAL_POPUP', payload: purchase });
    };

    const handleRolePopUp = (purchase: Purchase) => {
        dispatch({ type: 'OPEN_ROLE_POPUP', payload: purchase });
    };

    const handleAddressPopUp = (purchase: Purchase) => {
        dispatch({ type: 'OPEN_ADDRESS_POPUP', payload: purchase });
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
        console.log(editedPurchase)
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
        setEditedPurchase(null);
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
                            {purchases.map((purchase: Purchase) => (
                                <TableRow key={purchase.purchaseId}>
                                    <TableCell>{purchase.purchaseDate}</TableCell>
                                    <TableCell> {purchase.totalAmount} </TableCell>
                                    <TableCell>purchase details</TableCell>
                                    {editMode && purchase.purchaseId == editedPurchase?.purchaseId ? (
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
                                                <Button onClick={() => handleEdit(purchase)} variant="contained" color="secondary"> Modify </Button>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(purchases.length / 9)}
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

export default PurchaseManage;
