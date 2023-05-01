/* ------------------------------------------------------
# Copyright (c) [2022] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Settings page
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { useReducer } from 'react';

/* Material UI includes */
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Website includes */
import { Page } from '../../containers';
import { useScenario, useConfig } from '../../providers';
import logMessage from '../../utils/logging';

/* Local includes */
import SettingsButton from './SettingsButton';
import SettingsTime from './SettingsTime';
import SettingsDynamics from './SettingsDynamics';
import SettingsMat from './SettingsMat';
import SettingsRobot from './SettingsRobot';
import reducer from './store/reducer';


function Settings() {

    /* --------- Gather inputs --------- */
    const { changeDesign, changeMat, changeRefresh, changeAbaqus, time, dynamics, refresh, robot, mat, model, mcontent, abaqus, acontent } = useScenario();
    const { appConfig } = useConfig();
    var local_robot = null
    if (robot !== null)
    {

        local_robot = JSON.parse(JSON.stringify(robot))
        local_robot.design.filename = model
        local_robot.design.content = mcontent
        local_robot.abaqus.filename = abaqus
        local_robot.abaqus.content = acontent

    }
    const [ localSettings, dispatch] = useReducer(reducer, {
        time: time,
        dynamics: dynamics,
        robot: local_robot,
        mat: mat,
        refresh: refresh,
    });
    const { menu, scenario } = appConfig || {};
    const { height = '115px' } = menu || {};
    const theme = useTheme();
    const componentName = 'Settings';

    /* -------- Defining sizes --------- */
    const topString = height;

    const handleValidate = (event) => {

        logMessage(componentName, 'handleValidate --- BEGIN');
        var time = JSON.parse(JSON.stringify(localSettings.time))
        time.period = localSettings.time.period * 0.001

        var dynamics = JSON.parse(JSON.stringify(localSettings.dynamics))
        dynamics.coordinates.north = parseFloat(localSettings.dynamics.coordinates.north)
        dynamics.coordinates.east  = parseFloat(localSettings.dynamics.coordinates.east)
        dynamics.coordinates.yaw   = parseFloat(localSettings.dynamics.coordinates.yaw)

        var mat = JSON.parse(JSON.stringify(scenario.mats[localSettings.mat]))
        delete mat.name

        var robot = JSON.parse(JSON.stringify(localSettings.robot))
        delete robot.design.filename
        delete robot.abaqus.filename
        console.log(JSON.stringify({
            time: time,
            dynamics: dynamics,
            robot: robot,
            mat: mat,
        }))
        fetch('v1/command/configure',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time: time,
                dynamics: dynamics,
                robot: robot,
                mat: mat,
            }),
        })
            .catch((err) => { console.log(err.message); });

        changeMat(localSettings.mat)
        changeRefresh(localSettings.refresh)
        changeDesign(localSettings.robot.design.filename, localSettings.robot.design.content)
        changeAbaqus(localSettings.robot.abaqus.filename, localSettings.robot.abaqus.content)

        logMessage(componentName, 'handleValidate --- END');

    }

    /* ----------- Define HTML --------- */
    return (
        <Page pageTitle="Settings">
            <Box style={{ backgroundColor: '#ffffff', height: topString }} />
            <Box style={{ position: 'relative', top: 0, left: '40px', right: '40px', marginBottom:'40px', width: `calc(100% - 80px)`, paddingLeft: '10px', paddingRight: '10px'}}>
                <SettingsTime refresh={localSettings.refresh} time={localSettings.time} dispatch={dispatch}/>
                <SettingsDynamics dynamics={localSettings.dynamics} dispatch={dispatch}/>
                <SettingsMat mat={localSettings.mat} dispatch={dispatch}/>
                <SettingsRobot robot={localSettings.robot} dispatch={dispatch}/>
            </Box>
            <SettingsButton onClick={handleValidate} col={theme.palette.primary.main} style={{marginBottom:15}}>Validate</SettingsButton>

        </Page>
    );

}

export default Settings;
