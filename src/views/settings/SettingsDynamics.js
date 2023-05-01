/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings dynamics container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Table, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon  } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import logMessage from '../../utils/logging';

/* dynamics includes */
import { SettingsAccordion, SettingsAccordionDetails, SettingsAccordionSummary } from './SettingsAccordion'
import { setDynamics } from './store/actions';
import SettingsTextField from './SettingsTextField';

function SettingsDynamics({dynamics, dispatch}) {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    const componentName = 'SettingsDynamics';

    /* ----- Manage commands ---- */
    const handleChangeNorth = (event) => {

        logMessage(componentName, 'handleChangeNorth --- BEGIN');
        if (event.target.value !== null) { dynamics.coordinates.north = event.target.value }
        dispatch(setDynamics(dynamics))
        logMessage(componentName, 'handleChangeNorth --- END');

    };

    const handleChangeEast = (event) => {

        logMessage(componentName, 'handleChangeEast --- BEGIN');
        if (event.target.value !== null) { dynamics.coordinates.east = event.target.value }
        dispatch(setDynamics(dynamics))
        logMessage(componentName, 'handleChangeEast --- END');

    };

    const handleChangeYaw = (event) => {

        logMessage(componentName, 'handleChangeYaw --- BEGIN');
        if (event.target.value !== null) { dynamics.coordinates.yaw = event.target.value }
        dispatch(setDynamics(dynamics))
        logMessage(componentName, 'handleChangeYaw --- END');

    };

    var north_value = 0
    if (dynamics !== null && 'north' in dynamics) { north_value = dynamics['north'] }
    var east_value = 0
    if (dynamics !== null && 'east' in dynamics) { east_value = dynamics['east'] }
    var yaw_value = 0
    if (dynamics !== null && 'yaw' in dynamics) { yaw_value = dynamics['yaw'] }

    /* ----------- Define HTML --------- */
    return (
        <SettingsAccordion>
            <SettingsAccordionSummary expandIcon={<ExpandMoreIcon />} col={theme.palette.primary.main}>
                <Typography>Dynamics Configuration</Typography>
            </SettingsAccordionSummary>
            <SettingsAccordionDetails>
                <Table style={{ width: '100%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> North </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField value={north_value} fullWidth size="small" color="primary" onChange={handleChangeNorth}/>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> cm </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> East </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField value={east_value} fullWidth size="small" color="primary" onChange={handleChangeEast}/>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> cm </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Yaw </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField value={yaw_value} fullWidth size="small" color="primary" onChange={handleChangeYaw}/>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> ° </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                    </TableBody>
                </Table>
            </SettingsAccordionDetails>
        </SettingsAccordion>
    );

}

export default SettingsDynamics;
