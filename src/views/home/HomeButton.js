/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Home button styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* Material UI includes */
import { Button } from '@mui/material';
import { styled } from '@mui/system';


const HomeButton = styled(Button)(({ col }) => ({

    color: col,
    verticalAlign: 'middle',
    borderRadius: '0',
    paddingLeft: '3px',
    paddingRight: '3px',
    paddingTop: '3px',
    paddingBottom: '2px',
    fontSize: '14px',
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


export default HomeButton;
