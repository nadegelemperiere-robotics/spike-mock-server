/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Desktop bar styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { AppBar } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useMenu } from '../../providers';

const DesktopBarFrame = styled(AppBar)(({ height, width, top, left, col }) => ({
    position: 'absolute',
    backgroundColor: col,
    height,
    width,
    display: 'flex',
    marginTop: top,
    marginLeft: left,
    flexDirection: 'row',
    top: '0px',
    left: '0px',
}));

function DesktopBar(props) {

    /* --------- Gather inputs --------- */
    const { height, width, top, left, children } = props;
    const { isSliding } = useMenu();
    const theme = useTheme();
    //const componentName = 'DesktopBar';

    /* ----------- Define HTML --------- */
    return (
        <DesktopBarFrame elevation={isSliding ? 4 : 0} height={height} width={width} top={top} left={left} col={isSliding ? theme.palette.primary.main : 'rgba(255,255,255,0)'}>
            {children}
        </DesktopBarFrame>
    );

}

export default DesktopBar;
