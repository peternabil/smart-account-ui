import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleBackdrop({btntitle, open, setOpen, children, color, opacity }) {
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box>
            <Button size="small" onClick={handleOpen} variant="containes" startIcon={<AddIcon />}>
                {btntitle}
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: color, opacity: opacity ,width: '100%', height: '100%' }}
                open={open}
             >
                <Box width='100%' padding={7} display={'flex'} flexWrap={'wrap'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
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