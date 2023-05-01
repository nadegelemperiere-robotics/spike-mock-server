/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Navigation typography styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* Material UI includes */
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const NavigationTypography = styled(Typography)(({ col }) => ({

    color: col,
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '3',

}));

export default NavigationTypography;
