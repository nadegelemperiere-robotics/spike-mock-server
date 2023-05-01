/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Navigation stack styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* Material UI includes */
import { Stack } from '@mui/material';
import { styled } from '@mui/system';

const NavigationStack = styled(Stack)(
    ({
        color = '#ffffff',
        padding = '10px',
        height = '100%',
    }) => ({
        borderColor: color,
        borderWidth: '0px',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderRadius: '0px',
        color,
        paddingRight: padding,
        paddingLeft: padding,
        paddingTop: 0,
        paddingBottom: 0,
        height,
        right: '0px',
        width: '100%',
        verticalAlign: 'middle',
    })
);

export default NavigationStack;
