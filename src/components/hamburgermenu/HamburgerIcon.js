/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Hamburber icon container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Menu as MenuIcon } from '@mui/icons-material';

/* Other external includes */
import styled from 'styled-components';

/* Website includes */
import { useMenu } from '../../providers';
import logMessage from '../../utils/logging';

const HamburgerIconBox = styled.button`
    right: 0px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.col};
    border-radius: 0px;
    background-color: rgba(255,255,255,0);
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 0;
    min-width: 40px;
`;

function HamburgerIcon(props) {

    /* --------- Gather inputs --------- */
    const { color, width, height } = props;
    const { toggleThis } = useMenu();
    const componentName = 'HamburgerIcon';

    /* ------- Manage menu click ------- */
    const handleHamburgerMenuClick = () => {

        logMessage(componentName, 'handleHamburgerMenuClick --- BEGIN');
        toggleThis('isMenuOpen');
        logMessage(componentName, 'handleHamburgerMenuClick --- BEGIN');

    };

    /* ----------- Define HTML --------- */
    return (
        <HamburgerIconBox aria-label="open drawer" tabindex="0" type="button" size="small" onClick={handleHamburgerMenuClick} col={color} height={height} width={width} style={{ backgroundColor:'rgba(255,255,255,0)', borderColor:color, borderStyle:'solid' }}>
            <MenuIcon style={{ width, height: width, color }} />
        </HamburgerIconBox>
    );

}

export default HamburgerIcon;
