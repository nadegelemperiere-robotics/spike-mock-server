/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Spike hub status light component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const PartStatusLight = styled(Box)(({ top, width=10, height=22, color, on }) => ({
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
    top: top,
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#aaaaaa',
    backgroundColor: on ? color : `rgba(255,255,255,0)`,
}));

export default PartStatusLight;