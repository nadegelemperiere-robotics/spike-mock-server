/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike hub light matrix component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const PartLightMatrix = styled(Box)(({ theme, on = 0, width=22, height=22 }) => ({
    width: width,
    height: height,
    minHeight: height,
    borderRadius: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: on ? theme.palette.primary.main : '#eeeeee',
}));

export default PartLightMatrix;
