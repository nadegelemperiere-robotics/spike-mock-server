/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings textfield customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/
/* Material UI includes */
import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const SettingsTextField = styled(TextField)(({ theme }) => ({
    color:theme.palette.primary.main,
    'input.Mui-disabled': {
        opacity: 0.5,
        backgroundColor: 'rgba(0,0,0,0.2);',
    },
}));

export default SettingsTextField;
