/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Hamburger logo definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Link } from '@mui/material';
import { styled } from '@mui/system';

/* Website includes */
import Image from '../image/Image';

const HamburgerLogoLink = styled(Link)(({ padding, height }) => ({
    height,
    paddingBottom: padding,
    paddingTop: padding,
    paddingLeft: '10px',
    paddingRight: '10px',
}));

function HamburgerLogo(props) {

    /* --------- Gather inputs --------- */
    const { padding, reference, height } = props;

    /* ---------- Derive size ---------- */
    const logoHeight = `calc( ${height} - 2 * ${padding} )`;

    /* ----------- Define HTML --------- */
    return (
        <HamburgerLogoLink href="/home" height={height} padding={padding}>
            <Image reference={reference} style={{ height: logoHeight, verticalAlign: 'middle', top: padding }} />
        </HamburgerLogoLink>
    );

}

export default HamburgerLogo;
