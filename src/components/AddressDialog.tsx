import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { User } from "../interfaces/GameInterface"

interface AddressDialogProps {
    open: boolean;
    onClose: () => void;
    selectedUser: User | null;
}

const AddressDialog: React.FC<AddressDialogProps> = React.memo(({ open, onClose, selectedUser }) => {
    if (!selectedUser) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle> Address </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">No address available.</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    const { address } = selectedUser;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Address </DialogTitle>
            <DialogContent>
                <div>
                    {Object.entries(address).map(([key, value]) => (
                        <Typography variant="subtitle1" key={key}>{key}: {value}</Typography>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
});

export default AddressDialog;