/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Home containers customization
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* Material UI includes */
import { Grid, Container } from '@mui/material';
import { styled } from '@mui/system';

const HomeGridContainer = styled(Grid)(() => ({
    marginTop: '0px',
    position: 'relative',
    width: '100%',
    left: '10px',
    right: '0px',
    paddingLeft: '10px',
    paddingRight: '0px',
}));

const HomeMediaContainer = styled(Container)(({ vertical, paddinglr = '5px', paddingtb = '5px' }) => ({
    '@media': {
        paddingLeft: paddinglr,
        paddingRight: paddinglr,
        paddingTop: paddingtb,
        paddingBottom: paddingtb,
    },
    paddingLeft: paddinglr,
    paddingRight: paddinglr,
    paddingTop: paddingtb,
    paddingBottom: paddingtb,
    marginRight: vertical ? paddinglr : '0px',
    marginLeft: vertical ? paddinglr : '0px',
}));

const HomeGridItem = styled(Grid)(() => ({
    position: 'relative',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
}));


export { HomeGridContainer, HomeMediaContainer, HomeGridItem };
