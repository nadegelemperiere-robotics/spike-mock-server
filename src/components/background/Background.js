/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Background with image component
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box } from '@mui/material';
import { styled } from '@mui/system';

/* Website includes */
import { useConfig, useMenu } from '../../providers';

const BackgroundBox = styled(Box)(({ id, size, large, small, medium }) => ({
    id,
    backgroundColor: 'black',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: size,
    backgroundImage: large,
    '@media all and (max-device-width: 768px)': { backgroundImage: medium },
    '@media all and (max-device-width: 320px)': { backgroundImage: small },
}));

function Background(props) {

    /* --------- Gather inputs --------- */
    const { reference, children, id, size } = props;
    const { supportsWebp } = useMenu();
    const { appConfig } = useConfig();
    const { images } = appConfig;
    const data = images[reference];

    /* ----- Create background urls ---- */
    let urlSmall = '';
    let urlMedium = '';
    let urlLarge = '';
    if (supportsWebp) {

        urlSmall = `url( ${data.webp.small.img} )`;
        urlMedium = `url( ${data.webp.medium.img} )`;
        urlLarge = `url( ${data.webp.large.img} )`;

    } else {

        urlSmall = `url( ${data.default} )`;
        urlMedium = `url( ${data.default} )`;
        urlLarge = `url( ${data.default} )`;

    }

    /* ----------- Define HTML --------- */
    return (
        <BackgroundBox id={id} size={size} large={urlLarge} medium={urlMedium} small={urlSmall}>
            {children}
        </BackgroundBox>
    );

}

export default Background;
