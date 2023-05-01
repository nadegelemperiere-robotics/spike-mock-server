/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings robot container
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useState } from 'react';

/* Material UI includes */
import { Pagination, Stack, InputAdornment, Table, TableRow, TableCell, TableBody, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FileUploadRounded as FileUploadRoundedIcon, ExpandMore as ExpandMoreIcon, Delete as DeleteIcon, Add as AddIcon  } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { PartColorSensor, PartMotor, PartForceSensor, PartDistanceSensor, PartWheel } from '../../components';
import logMessage from '../../utils/logging';

/* Local includes */
import {SettingsAccordion, SettingsAccordionDetails, SettingsAccordionSummary } from './SettingsAccordion'
import SettingsTextField from './SettingsTextField';
import SettingsButton from './SettingsButton';
import { setRobot } from './store/actions';

function SettingsRobot({robot, dispatch}) {

    /* --------- Gather inputs --------- */
    const theme = useTheme();
    const componentName = 'SettingsRobot';
    const [componentIndex, setComponentIndex] = useState(0)

    /* eslint-disable no-useless-escape */
    const design_filename = ( robot !== null && 'design' in robot && 'filename' in robot['design'] ? robot.design.filename.replace(/^.*[\\\/]/, '') : "")
    const abaqus_filename = ( robot !== null && 'abaqus' in robot && 'filename' in robot['abaqus'] ? robot.abaqus.filename.replace(/^.*[\\\/]/, '') : "")
    /* eslint-enable no-useless-escape */

    /* ----- Manage commands ---- */
    const handleChangeLdu = (event) => {

        logMessage(componentName, 'handleChangePeriod --- BEGIN');
        if (event.target.value !== null) { robot.design.ldu = event.target.value }
        dispatch(setRobot(robot))
        logMessage(componentName, 'handleChangePeriod --- END');

    };

    const handleModelUpload = (event) => {

        logMessage(componentName, 'handleModelUpload --- BEGIN');
        if (event.target.files.length > 0) {

            robot.design.filename = event.target.files[0].name
            const reader = new FileReader()
            reader.readAsText(event.target.files[0])
            reader.onload = function() {

                robot.design.content = reader.result
                dispatch(setRobot(robot))

            }

        }
        logMessage(componentName, 'handleModelUpload --- END');

    }

    const handleAbaqusUpload = (event) => {

        logMessage(componentName, 'handleAbaqusUpload --- BEGIN');
        if (event.target.files.length > 0) {

            robot.abaqus.filename = event.target.files[0].name
            const reader = new FileReader()
            reader.readAsArrayBuffer(event.target.files[0])
            reader.onload = function() {

                const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(reader.result)));
                robot.abaqus.content = base64String
                dispatch(setRobot(robot))

            }

        }
        logMessage(componentName, 'handleAbaqusUpload --- END');

    }

    const handleChangeComponent = (parameter, index) => (event) => {

        logMessage(componentName, 'handleComponentChange --- BEGIN');
        if (event.target.value !== null && parameter === 'index') { robot.components[index].index = event.target.value }
        if (event.target.value !== null && parameter === 'port') { robot.components[index].port = event.target.value }
        if (event.target.value !== null && parameter === 'id') { robot.components[index].id = event.target.value }
        if (event.target.value !== null && parameter === 'type') { robot.components[index].type = event.target.value }
        if (event.target.value !== null && parameter === 'spin') { robot.components[index].spin = event.target.value }
        dispatch(setRobot(robot))
        logMessage(componentName, 'handleComponentChange --- END');

    };


    const handleSwitchComponent = (event, value) => {

        logMessage(componentName, 'handleSwitchComponent --- BEGIN');
        setComponentIndex(value - 1)
        logMessage(componentName, 'handleSwitchComponent --- END');

    }

    const handleDeleteComponent = (event) => {

        logMessage(componentName, 'handleDeleteComponent --- BEGIN');
        robot.components.splice(componentIndex, 1);
        dispatch(setRobot(robot))
        if (componentIndex > 0) { setComponentIndex(componentIndex - 1) }
        else { setComponentIndex(0) }
        logMessage(componentName, 'handleDeleteComponent --- END');

    }

    const handleAddComponent = (event) => {

        logMessage(componentName, 'handleAddComponent --- BEGIN');
        robot.components.push({'type':'Motor', 'port':'A', 'index' : 0, 'id' : 0, 'spin' : 1})
        dispatch(setRobot(robot))
        setComponentIndex(robot.components.length - 1)
        logMessage(componentName, 'handleAddComponent --- END');

    }

    /* eslint-disable padded-blocks */
    var ldu_value = 0
    if (robot !== null && 'design' in robot && 'ldu' in robot['design']) { ldu_value = robot['design']['ldu'] }
    var number_value = 0
    if (robot !== null && 'components' in robot && robot['components'] != null) {
        number_value = robot.components.length
    }
    var port_value = 'A'
    if (robot !== null && 'components' in robot && robot['components'] != null && robot['components'].length > componentIndex) {
        port_value = robot.components[componentIndex].port
    }
    var spin_value = 1
    if (robot !== null && 'components' in robot && robot['components'] != null && robot['components'].length > componentIndex && 'spin' in robot.components[componentIndex]) {
        spin_value = robot.components[componentIndex].spin
    }
    var index_value = 0
    if (robot !== null && 'components' in robot && robot['components'] != null && robot['components'].length > componentIndex) {
        index_value = robot.components[componentIndex].index
    }
    var id_value = 0
    if (robot !== null && 'components' in robot && robot['components'] != null && robot['components'].length > componentIndex) {
        id_value = robot.components[componentIndex].id
    }
    var type_value = 'Motor'
    if (robot !== null && 'components' in robot && robot['components'] != null && robot['components'].length > componentIndex) {
        type_value = robot.components[componentIndex].type
    }
    /* eslint-enable padded-blocks */


    console.log(robot)

    /* ----------- Define HTML --------- */
    return (
        <SettingsAccordion>
            <SettingsAccordionSummary expandIcon={<ExpandMoreIcon />} col={theme.palette.primary.main}>
                <Typography>Robot Configuration</Typography>
            </SettingsAccordionSummary>
            <SettingsAccordionDetails>
                <Table style={{ width: '100%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Ldraw model </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Stack alignItems="center" direction="row" justifyContent="space-between">
                                    <SettingsTextField fullWidth type="file" onChange={handleModelUpload}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FileUploadRoundedIcon />
                                                </InputAdornment>
                                            ),
                                        }}/>
                                </Stack>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> {design_filename} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> Ldraw unit </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <SettingsTextField value={ldu_value} fullWidth size="small" color="primary" onChange={handleChangeLdu}/>
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
                                <Typography style={{ fontSize: '11px' }}> Abaqus </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Stack alignItems="center" direction="row" justifyContent="space-between">
                                    <SettingsTextField fullWidth type="file" onChange={handleAbaqusUpload}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FileUploadRoundedIcon />
                                                </InputAdornment>
                                            ),
                                        }}/>
                                </Stack>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> {abaqus_filename} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} style={{ padding: 5, borderWidth: '0px', borderStyle: 'none' }}/>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width:'20%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px' }}> </Typography>
                            </TableCell>
                            <TableCell style={{ width:'70%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Stack spacing={2} alignItems="center" direction="column" justifyContent="center">
                                    <Typography style={{ textTransform:'uppercase', textAlign: 'center', fontSize: '13px', paddingLeft:'10px', fontWeight: 'bold', color: theme.palette.primary.main }}> Components </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Pagination count={number_value} page={componentIndex + 1} color="primary" onChange={handleSwitchComponent} />
                                        <SettingsButton variant="outlined" col={theme.palette.primary.main} startIcon={<DeleteIcon />} onClick={handleDeleteComponent}>
                                            Delete
                                        </SettingsButton>
                                        <SettingsButton variant="outlined" col={theme.palette.primary.main} startIcon={<AddIcon />} onClick={handleAddComponent}>
                                            Add
                                        </SettingsButton>
                                    </Stack>
                                    <FormControl fullWidth size="small">
                                        <InputLabel >Port</InputLabel>
                                        <Select
                                            value={port_value}
                                            label="Port"
                                            onChange={handleChangeComponent('port',componentIndex)}
                                        >
                                            <MenuItem value={'A'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> A </Typography>
                                            </MenuItem>
                                            <MenuItem value={'B'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> B </Typography>
                                            </MenuItem>
                                            <MenuItem value={'C'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> C </Typography>
                                            </MenuItem>
                                            <MenuItem value={'D'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> D </Typography>
                                            </MenuItem>
                                            <MenuItem value={'E'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> E </Typography>
                                            </MenuItem>
                                            <MenuItem value={'F'}>
                                                <Typography style={{ fontSize: '11px', textAlign: 'center' }}> F </Typography>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth size="small">
                                        <InputLabel >Type</InputLabel>
                                        <Select
                                            value={type_value}
                                            label="Type"
                                            onChange={handleChangeComponent('type',componentIndex)}
                                        >
                                            <MenuItem value={'ColorSensor'}>
                                                <PartColorSensor size="30" color='white' align='center' text=""/>
                                            </MenuItem>
                                            <MenuItem value={'ForceSensor'}>
                                                <PartForceSensor size="30" color='white' align='center' text=""/>
                                            </MenuItem>
                                            <MenuItem value={'DistanceSensor'}>
                                                <PartDistanceSensor size="30" color='white' align='center' text=""/>
                                            </MenuItem>
                                            <MenuItem value={'Motor'}>
                                                <PartMotor size="30" color='white' align='center' text=""/>
                                            </MenuItem>
                                            <MenuItem value={'Wheel'}>
                                                <PartWheel size="30" color='white' align='center' text=""/>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <SettingsTextField label="index" value={index_value} inputProps={{style: {fontSize: '11px', textAlign:'center'}}} fullWidth size="small" color="primary" onChange={handleChangeComponent('index',componentIndex)}/>
                                    <SettingsTextField label="lego part id" value={id_value} inputProps={{style: {fontSize: '11px', textAlign:'center'}}} fullWidth size="small" color="primary" onChange={handleChangeComponent('id',componentIndex)}/>
                                    {(type_value === 'Wheel') && (<SettingsTextField label="spin" value={spin_value} inputProps={{style: {fontSize: '11px', textAlign:'center'}}} fullWidth size="small" color="primary" onChange={handleChangeComponent('spin',componentIndex)}/>)}
                                </Stack>
                            </TableCell>
                            <TableCell style={{ width:'10%', padding: 0, borderWidth: '0px', borderStyle: 'none' }}>
                                <Typography style={{ fontSize: '11px', paddingLeft:'10px' }}> </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </SettingsAccordionDetails>
        </SettingsAccordion>
    );

}

export default SettingsRobot;
