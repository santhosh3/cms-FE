import React from 'react';
import {
    CircularProgress,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Dialog,
    Avatar
} from '@mui/material';
import { useUserProfile } from '../../graphql/UserProfile';


export default function UserProfile() {
    const { loading, error, data } = useUserProfile();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return <CircularProgress color="inherit" />;
    }

    if (error) {
        return(
            <>
            NotFound
            </>
        )
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
               <Avatar src={data?.me.avatarUrl}/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                     
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}