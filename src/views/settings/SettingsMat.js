/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings mat container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Box, Table, TableRow, TableCell, TableBody, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon  } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { useConfig } from '../../providers';
import logMessage from '../../utils/logging';

/* Local includes */
import {SettingsAccordion, SettingsAccordionDetails, SettingsAccordionSummary } from './SettingsAccordion'
import { setMat } from './store/actions';


function SettingsMat({mat, dispatch}) {

    /* --------- Gather inputs --------- */
    const { appConfig } = useConfig();
    const { scenario } = appConfig || {};
    const { mats = [] } = scenario || {};
    const theme = useTheme();
    const componentName = 'SettingsMat';

    /* ----- Manage commands ---- */
    const handleChangeMat = (event) => {

        logMessage(componentName, 'handleChangeMat --- BEGIN');
        if (event.target.value !== null) { dispatch(setMat(event.target.value)) }
        logMessage(componentName, 'handleChangeMat --- END');

    };

    var mat_value = 0
    if (mat !== null) { mat_value = mat }

    /* ----------- Define HTML --------- */
    return (
        <SettingsAccordion>
            <SettingsAccordionSummary expandIcon={<ExpandMoreIcon />} col={theme.palette.primary.main}>
                <Typography>Mat Configuration</Typography>
            </SettingsAccordionSummary>
            <SettingsAccordionDetails>
                <Table style={{ width: '100%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Mode </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel >Challenge</InputLabel>
                                    <Select
                                        value={mat_value}
                                        label="Challenge"
                                        onChange={handleChangeMat}
                                    >
                                        { mats.map((item, index) => {

                                            return(
                                                <MenuItem value={index} key={index}>{item.name}</MenuItem>
                                            )

                                        })}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}>  </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box style={{position: 'relative', width: '50%', left:'25%', marginTop:20, paddingBottom:15}}>
                    {(mat_value >= 0 && 'image' in mats[mat_value]) && (<Box component="img" alt="The mat image." src={mats[mat_value].image} style={{width: '100%'}}/>)}
                </Box>
            </SettingsAccordionDetails>
        </SettingsAccordion>
    );

}

export default SettingsMat;
