import AddressDialog from '../../components/AddressDialog';
import RoleDialog from '../../components/RoleDialog';
import SocialDialog from '../../components/SocialDialog';
import axios from 'axios';
import User from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Pagination } from '@mui/material';
import { useState, useReducer, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';

const UserManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/user';

    type StateType = {
        openAddressPopup: boolean;
        openRolePopup: boolean;
        openSocialPopup: boolean;
        selectedUser: User | null;
    };

    type ActionType =
        | { type: 'OPEN_ADDRESS_POPUP'; payload: User }
        | { type: 'CLOSE_ADDRESS_POPUP' }
        | { type: 'OPEN_ROLE_POPUP'; payload: User }
        | { type: 'CLOSE_ROLE_POPUP' }
        | { type: 'OPEN_SOCIAL_POPUP'; payload: User }
        | { type: 'CLOSE_SOCIAL_POPUP' };


    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [editMode, setEditMode] = useState(false);

    const handleEdit = (user: User) => {
        setEditedUser(user);
        setEditMode(true);
    };

    const initialState = {
        openAddressPopup: false,
        openRolePopup: false,
        openSocialPopup: false,
        selectedUser: null
    };


    const reducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'OPEN_ADDRESS_POPUP':
                return { ...state, openAddressPopup: true, selectedUser: action.payload };
            case 'CLOSE_ADDRESS_POPUP':
                return { ...state, openAddressPopup: false, selectedUser: null };
            case 'OPEN_ROLE_POPUP':
                return { ...state, openRolePopup: true, selectedUser: action.payload };
            case 'CLOSE_ROLE_POPUP':
                return { ...state, openRolePopup: false, selectedUser: null };
            case 'OPEN_SOCIAL_POPUP':
                return { ...state, openSocialPopup: true, selectedUser: action.payload };
            case 'CLOSE_SOCIAL_POPUP':
                return { ...state, openSocialPopup: false, selectedUser: null };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_URL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSocialPopUp = (user: User) => {
        dispatch({ type: 'OPEN_SOCIAL_POPUP', payload: user });
    };

    const handleRolePopUp = (user: User) => {
        dispatch({ type: 'OPEN_ROLE_POPUP', payload: user });
    };

    const handleAddressPopUp = (user: User) => {
        dispatch({ type: 'OPEN_ADDRESS_POPUP', payload: user });
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
        console.log(editedUser)
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
        setEditedUser(null);
        setEditMode(false);
    };

    function handleFirstNameChange(value: string): void {
    }

    function handleLastNameChange(value: string): void {
    }

    function handlePhoneChange(value: string): void {
    }

    function handleFormOpen(event: any): void {
    }

    return (
        <div>
            <HeaderAdmin />
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '69vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Contraseña</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Foto de perfil</TableCell>
                                <TableCell>Social</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Cuenta</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user: User) => (
                                <TableRow key={user.userId}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell> ***** </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {editMode && user.userId == editedUser?.userId ? (
                                            <input
                                                type="text"
                                                value={editedUser?.firstName}
                                                onChange={(e) => handleFirstNameChange(e.target.value)}
                                            />
                                        ) : (
                                            user.firstName
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode && user.userId == editedUser?.userId ? (
                                            <input
                                                type="text"
                                                value={editedUser?.lastName}
                                                onChange={(e) => handleLastNameChange(e.target.value)}
                                            />
                                        ) : (
                                            user.lastName
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editMode && user.userId == editedUser?.userId ? (
                                            <input
                                                type="phone"
                                                value={editedUser?.phone}
                                                onChange={(e) => handlePhoneChange(e.target.value)}
                                            />
                                        ) : (
                                            user.phone
                                        )}
                                    </TableCell>
                                    <TableCell>{user.profilePic}</TableCell>
                                    <TableCell onClick={user.social ? () => handleSocialPopUp(user) : undefined}>
                                        {user.social ? 'ver social...' : 'No hay datos'}
                                    </TableCell>
                                    <TableCell onClick={user.role ? () => handleRolePopUp(user) : undefined}>
                                        {user.role ? 'ver rol...' : 'No hay datos'}
                                    </TableCell>
                                    <TableCell onClick={user.address ? () => handleAddressPopUp(user) : undefined}>
                                        {user.address ? 'ver cuenta...' : 'No hay datos'}
                                    </TableCell>
                                    {editMode && user.userId == editedUser?.userId ? (
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
                                                <Button onClick={() => handleEdit(user)} variant="contained" color="secondary"> Modify </Button>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(users.length / 9)}
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
            <AddressDialog open={state.openAddressPopup} onClose={handleAddressPopUpClose} selectedUser={state.selectedUser} />
            <RoleDialog open={state.openRolePopup} onClose={handleRolePopUpClose} selectedUser={state.selectedUser} />
            <SocialDialog open={state.openSocialPopup} onClose={handleSocialPopUpClose} selectedUser={state.selectedUser} />
            <RoleDialog open={state.openRolePopup} onClose={handleRolePopUpClose} selectedUser={state.selectedUser} />
            <AddressDialog open={state.openAddressPopup} onClose={handleAddressPopUpClose} selectedUser={state.selectedUser} />
        </div>
    );
};

export default UserManage;
