/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings time container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

/* Material UI includes */
import { Table, TableRow, TableCell, TableBody, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon  } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import { SettingsAccordion, SettingsAccordionDetails, SettingsAccordionSummary } from './SettingsAccordion'
import SettingsTextField from './SettingsTextField';
import { setTime, setRefresh } from './store/actions';


function SettingsTime({time, refresh, dispatch}) {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    const componentName = 'SettingsTime';

    /* ----- Manage commands ---- */
    const handleChangeMode = (event) => {

        logMessage(componentName, 'handleChangeMode --- BEGIN');
        if (event.target.value !== null) { time.mode = event.target.value }
        dispatch(setTime(time))
        logMessage(componentName, 'handleChangeMode --- END');

    };

    const handleChangePeriod = (event) => {

        logMessage(componentName, 'handleChangePeriod --- BEGIN');
        if (event.target.value !== null) { time.period = event.target.value }
        dispatch(setTime(time))
        logMessage(componentName, 'handleChangePeriod --- END');

    };

    const handleChangeRefresh = (event) => {

        logMessage(componentName, 'handleChangeRefresh --- BEGIN');
        if (event.target.value !== null) { dispatch(setRefresh(event.target.value)) }
        logMessage(componentName, 'handleChangeRefresh --- END');

    };

    var mode_value = "realtime"
    if (time !== null && 'mode' in time) { mode_value = time['mode'] }
    var period_value = 0
    if (time !== null && 'period' in time) { period_value = time['period'] }
    var refresh_value = 0
    if (refresh !== null) { refresh_value = refresh}
    var disabled_value = true
    if (time !== null && 'mode' in time) { disabled_value = time['mode'] === 'realtime' }


    /* ----------- Define HTML --------- */
    return (
        <SettingsAccordion>
            <SettingsAccordionSummary expandIcon={<ExpandMoreIcon />} col={theme.palette.primary.main}>
                <Typography>Time Configuration</Typography>
            </SettingsAccordionSummary>
            <SettingsAccordionDetails>
                <Table style={{ width: '100%' }}>
                    <TableBody style={{ width: '100%' }}>
                        <TableRow style={{ width: '100%' }}>
                            <TableCell colSpan={3} style={{ width:'100%', padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1} style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Mode </Typography>
                            </TableCell>
                            <TableCell colSpan={1} style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel >Mode</InputLabel>
                                    <Select
                                        value={mode_value}
                                        label="Mode"
                                        onChange={handleChangeMode}
                                    >
                                        <MenuItem value={'realtime'}>Realtime</MenuItem>
                                        <MenuItem value={'timecontrolled'}>Time Controlled</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ width:'100%', padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Time period </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField theme={theme} disabled={disabled_value} fullWidth size="small" value={period_value} onChange={handleChangePeriod} color="primary"/>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> ms </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Refresh rate </Typography>
                            </TableCell>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField theme={theme} value={refresh_value} fullWidth size="small" color="primary" onChange={handleChangeRefresh}/>
                            </TableCell>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> ms </Typography>
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

export default SettingsTime;
