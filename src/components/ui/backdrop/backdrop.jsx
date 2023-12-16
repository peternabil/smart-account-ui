import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleBackdrop({open, setOpen, children, color }) {
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box>
            <Fab size='small' onClick={handleOpen} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: color, width: '100%' }}
                open={open}
            >
                <Box padding={1} display={'flex'} flexWrap={'wrap'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
                    <Box padding={1} width={'100%'} display={'flex'} flexWrap={'wrap'} gap={3} justifyContent={'end'}>
                        <Fab width={'165px'} size='small' onClick={handleClose} aria-label="add">
                            <CloseIcon />
                        </Fab>
                    </Box>
                    {children}
                </Box>
            </Backdrop>
        </Box>
    );
}