/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Navigation button styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* Material UI includes */
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const NavigationButton = styled(Button)(({ col }) => ({

    color: col,
    verticalAlign: 'middle',
    borderRadius: '0',
    paddingTop: '6.5px',
    paddingLeft: '4px',
    paddingRight: '4px',
    fontSize: '14px',
    span: { visibility: 'hidden' },
    '&:hover': {
        borderTopStyle: 'none',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderWidth: '3px',
        transition: 'border-bottom-style 2s',
    },
    '&:hover span': { visibility: 'visible' },
    a: { fontSize: '14px' },
    '@media all and (max-device-width: 720px)': { a: { fontSize: '12px' } },
}));

export default NavigationButton;
