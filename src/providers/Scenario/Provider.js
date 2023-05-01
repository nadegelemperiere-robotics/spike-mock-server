/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Scenario provider
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/


/* React includes */
import React, { useReducer, useEffect, useMemo } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

/* Local includes */
import ScenarioContext from './Context';
import reducer from './store/reducer';
import { setTime, setRobot, setRefresh, setDynamics, setMat, setModel, setMContent, setAbaqus, setAContent } from './store/actions';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { appConfig, children, persistKey = 'scenario' } = props;
    const { scenario } = appConfig || {};
    const componentName = 'ScenarioProvider';

    const savedState = JSON.parse(localStorage.getItem(persistKey));

    /* Create local copy */
    const [scenarioState, dispatch] = useReducer(reducer, {
        time: null,
        dynamics: null,
        robot: null,
        mat: (scenario.mats.length !== 0) ? 0 : -1,
        refresh: scenario.refresh,
        model: scenario.robot.design.filename,
        mcontent: "",
        abaqus: scenario.robot.abaqus.filename,
        acontent: "",
        ...savedState,
    });

    /* ----- Manage configuration initialization ------ */
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {

        var time = JSON.parse(JSON.stringify(scenario.time))
        time.period = scenario.time.period * 0.001

        var dynamics = JSON.parse(JSON.stringify(scenario.dynamics))
        dynamics.coordinates.north = parseFloat(scenario.dynamics.coordinates.north)
        dynamics.coordinates.east  = parseFloat(scenario.dynamics.coordinates.east)
        dynamics.coordinates.yaw   = parseFloat(scenario.dynamics.coordinates.yaw)

        var mat = JSON.parse(JSON.stringify(scenario.mats[scenarioState.mat]))
        delete mat.name

        var robot = JSON.parse(JSON.stringify(scenario.robot))
        delete robot.design.filename
        delete robot.abaqus.filename

        fetch(scenarioState.model)
            .then((r) => r.text())
            .then(text  => {

                scenarioState.mcontent = text
                robot.design.content = text
                console.log(JSON.stringify({
                    time: time,
                    dynamics: dynamics,
                    robot: robot,
                    mat: mat,
                }))
                fetch(scenarioState.abaqus)
                    .then((r) => r.blob())
                    .then(blob  => {

                        const reader = new FileReader()
                        reader.readAsArrayBuffer(blob)
                        reader.onload = function() {

                            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(reader.result)));
                            scenarioState.acontent = base64String
                            robot.abaqus.content = base64String
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

                        }

                    })

            })
        fetch('v1/command/configure')
            .then((response) => response.json())
            .then((data) => {

                dispatch(setTime(data.time!== null ? data.time: scenarioState.time))
                dispatch(setDynamics(data.dynamics!== null ? data.dynamics: scenarioState.dynamics))
                dispatch(setRobot(data.robot!== null ? data.robot: scenarioState.robot))

            })
            .catch((err) => { console.log(err.message); });

    },[]);
    /* eslint-enable react-hooks/exhaustive-deps */


    /* ----- Manage configuration retrieval ------ */
    useEffect(() => {

        logMessage(componentName, 'useEffect[scenarioState, period] --- BEGIN');
        /* eslint-disable padded-blocks, brace-style */
        function getStatus() {

            fetch('v1/command/configure')
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setTime(data.time!== null ? data.time: scenarioState.time))
                    dispatch(setDynamics(data.dynamics!== null ? data.dynamics: scenarioState.dynamics))
                    dispatch(setRobot(data.robot!== null ? data.robot: scenarioState.robot))
                })
                .catch((err) => { console.log(err.message); });
        }
        const interval = setInterval(() => getStatus(), scenarioState.refresh)
        logMessage(componentName, 'useEffect[scenarioState, refresh] --- END');
        return () => {
            clearInterval(interval);
        }
        /* eslint-disable padded-blocks, brace-style */
    }, [scenarioState]);


    useEffect(() => {

        logMessage(componentName, 'useEffect[scenarioState, persistKey] --- BEGIN');
        localStorage.setItem(persistKey, JSON.stringify(scenarioState));
        logMessage(componentName, 'useEffect[scenarioState, persistKey] --- END');

    }, [scenarioState, persistKey]);

    const memorizedValue = useMemo(() => ({

        changeMat(matIndex){

            logMessage(componentName, 'changeMat --- BEGIN');
            if (matIndex !== null) { dispatch(setMat(matIndex)) }
            logMessage(componentName, 'changeMat --- END');

        },
        changeRefresh(period){

            logMessage(componentName, 'changeRefresh --- BEGIN');
            if (period !== null) { dispatch(setRefresh(period)) }
            logMessage(componentName, 'changeRefresh --- END');

        },
        changeDesign(filename, content){

            logMessage(componentName, 'changeDesign --- BEGIN');
            if (filename !== null) {
                dispatch(setModel(filename))
                dispatch(setMContent(content))
            }
            logMessage(componentName, 'changeDesign --- END');

        },
        changeAbaqus(filename, content){

            logMessage(componentName, 'changeAbaqus --- BEGIN');
            if (filename !== null) {
                dispatch(setAbaqus(filename))
                dispatch(setAContent(content))
            }
            logMessage(componentName, 'changeAbaqus --- END');

        },
        time:     scenarioState.time,
        robot:    scenarioState.robot,
        refresh:  scenarioState.refresh,
        dynamics: scenarioState.dynamics,
        mat:      scenarioState.mat,
        model:    scenarioState.model,
        mcontent: scenarioState.mcontent,
        abaqus:   scenarioState.abaqus,
        acontent: scenarioState.acontent,
    }), [scenarioState]);


    /* ----------- Define HTML --------- */
    return (
        <ScenarioContext.Provider value={memorizedValue}>
            {children}
        </ScenarioContext.Provider>
    );

}

export default Provider;
