/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Profiler component
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React, { Profiler as Prof } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

function displayProfiling(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
) {

    const componentName = 'Profiler';
    logMessage(componentName, id);
    logMessage(componentName, phase);
    logMessage(componentName, actualDuration);
    logMessage(componentName, baseDuration);
    logMessage(componentName, startTime);
    logMessage(componentName, commitTime);
    logMessage(componentName, JSON.stringify(interactions));

}

function Profiler(props) {

    /* --------- Gather inputs --------- */
    const { children, id } = props;

    /* ----------- Define HTML --------- */
    return (
        <Prof id={id} onRender={displayProfiling}>
            {children}
        </Prof>
    );

}

export default Profiler;
