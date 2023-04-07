/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Page generic container
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
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
