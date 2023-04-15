/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Responsive image handling srcset, webp and fallbacks
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 february 2022
# Latest revision: 24 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material includes */
import { Grid, Divider, Link, Avatar } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import Image from '../image/Image';

function FooterDesktop() {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    //const componentName = 'FooterDesktop';

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Grid container style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
            <Grid container item xs={12}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            </Grid>
            <Grid item container xs={12} style={{ paddingTop:'10px' }}>
                <Grid item container xs={12} >
                    <Grid item xs={2} style={{ textAlign:'left' }}>
                        <Image reference='logo' style={{ width:'60px' }}/>
                    </Grid>
                    <Grid item xs={7}  >
                    </Grid>
                    <Grid container item xs={3} style={{ paddingTop:'5px' }} >
                        <Link href="https://github.com/nadegelemperiere/spike-mock-server/" target="_blank">
                            <Avatar style={{ backgroundColor:'rgba(255,255,255,0)' }}><GitHubIcon style={{ color:theme.palette.primary.main }}/></Avatar>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            </Grid>
            <Grid container item xs={12} style={{ paddingTop:'5px' }}>
            </Grid>
        </Grid>
    );
    /* eslint-enable padded-blocks */

}

export default FooterDesktop;
