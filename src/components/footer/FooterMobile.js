/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Footer component for mobile clients
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 february 2022
# Latest revision: 24 february 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material includes */
import { Typography, Grid, Avatar, Link, Divider } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import Image from '../image/Image';


function FooterMobile() {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    //const componentName = 'FooterMobile';

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Grid container>
            <Grid container item xs={12}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            </Grid>
            <Grid item container xs={12} style={{ paddingTop:'10px' }}>
                <Grid item container xs={12} >
                    <Grid item xs={3} style={{ textAlign:'left' }}>
                        <Image reference='logo' style={{ width:'60px' }}/>
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop:'17px' }} >
                        <Typography style={{ textTransform:'uppercase', color:theme.palette.primary.main, textAlign:'center', fontSize:'11px' }}>
                            Follow us :
                        </Typography>
                    </Grid>
                    <Grid container item xs={3} style={{ paddingTop:'5px' }} >
                        <Grid item xs={6}>
                            <Link href="https://github.com/nadegelemperiere/spike-mock-server/" target="_blank">
                                <Avatar style={{ backgroundColor:'rgba(255,255,255,0)' }}><GitHubIcon style={{ color:theme.palette.primary.main }}/></Avatar>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            </Grid>
            <Grid container item xs={12}>
                <Divider style={{ color:theme.palette.primary.main, borderColor:theme.palette.primary.main, width:'100%' }}/>
            </Grid>
        </Grid>
    );

}

export default FooterMobile;
