/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Navigation logo styling
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { styled } from '@mui/system';
import { Link } from '@mui/material';

/* Website includes */
import Image from '../image/Image';

const NavigationLogoLink = styled(Link)(({ logopadding }) => ({

    height: '100%',
    width: 'auto',
    marginRight: '10px',
    paddingBottom: logopadding,
    paddingTop: logopadding,

}));

function NavigationLogo(props) {

    /* --------- Gather inputs --------- */
    const { reference, padding } = props;

    /* ----------- Define HTML --------- */
    return (
        <NavigationLogoLink href="/" logopadding={padding}>
            <Image
                reference={reference}
                style={{ height: '100%', verticalAlign: 'middle' }}
            />
        </NavigationLogoLink>
    );

}

export default NavigationLogo;
