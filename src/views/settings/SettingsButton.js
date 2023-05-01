/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings button customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const SettingsButton = styled(Button)(({ col }) => ({

    color: col,
    verticalAlign: 'middle',
    borderRadius: '0',
    paddingLeft: '3px',
    paddingRight: '3px',
    paddingTop: '3px',
    paddingBottom: '2px',
    fontSize: '14px',
    borderColor: col,
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderWidth: '3px',
    '@media all and (max-device-width: 720px)': {
        fontSize: '12px',
        borderWidth: '2px',
        paddingLeft: '2px',
        paddingRight: '2px',
        paddingTop: '2px',
        paddingBottom: '1px',
    },
    '@media all and (max-device-width: 425px)': {
        fontSize: '10px',
        borderWidth: '2px',
        paddingLeft: '2px',
        paddingRight: '2px',
        paddingTop: '2px',
        paddingBottom: '1px',
    },

}));


export default SettingsButton;
