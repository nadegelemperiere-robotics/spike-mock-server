/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Mobile bar styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { AppBar } from '@mui/material';
import { styled } from '@mui/system';

/* Website includes */
import { useMenu } from '../../providers';

const MobileBarFrame = styled(AppBar)(({ col, height, width, top, left }) => ({
    backgroundColor: col,
    position: 'absolute',
    height,
    width,
    display: 'flex',
    marginTop: top,
    marginLeft: left,
    flexDirection: 'row',
    top: '0px',
    left: '0px',
}));

function MobileBar(props) {

    /* --------- Gather inputs --------- */
    const { height, width, top, left, children, col } = props;
    const { isSliding } = useMenu();

    /* ----------- Define HTML --------- */
    return (
        <MobileBarFrame
            elevation={isSliding ? 4 : 0}
            height={height}
            width={width}
            top={top}
            left={left}
            col={isSliding ? col : 'rgba(255,255,255,0)'}
        >
            {children}
        </MobileBarFrame>
    );

}

export default MobileBar;
