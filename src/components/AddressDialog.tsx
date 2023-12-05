import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { Provider } from "../interfaces/GameInterface"

interface AddressDialogProps {
    open: boolean;
    onClose: () => void;
    selectedProvider: Provider | null;
}

const AddressDialog: React.FC<AddressDialogProps> = React.memo(({ open, onClose, selectedProvider }) => {

    if (!selectedProvider) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle> Address </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">No address available.</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    const { address } = selectedProvider;

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