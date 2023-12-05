import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DescriptionDialog: React.FC<{ description: string | null; onClose: () => void }> = ({ description, onClose }) => {
    return (
        <Dialog open={Boolean(description)} onClose={onClose}>
            <DialogTitle>Description</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DescriptionDialog;