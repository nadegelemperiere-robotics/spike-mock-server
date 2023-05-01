/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Scenario provider mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';

const mockContextScenario = React.createContext(null);

let mockedValues = {}

function mockWithScenario(Component) {

    function ChildComponent(props) {

        /* eslint-disable react/jsx-props-no-spreading */
        return (
            <mockContextScenario.Consumer> {(contextProps) => <Component {...contextProps} {...props} /> }</mockContextScenario.Consumer>
        );
        /* eslint-enable react/jsx-props-no-spreading */

    }
    return ChildComponent;

}

function MockProvider(props) {

    const { children } = props;

    /* ----- Define provider values ---- */
    mockedValues = {
        changeMat(matIndex){ console.log(`changeMatMock --- ${matIndex.toString()}`) },
        changeRefresh(period){ console.log(`changeRefreshMock --- ${period.toString()}`) },
        changeDesign(filename, content){ console.log(`changeDesignMock --- ${filename} --- ${content}`) },
        changeAbaqus(filename, content){ console.log(`changeAbaqusMock --- ${filename} --- ${content}`) },
        time: {'mode' : 'realtime'},
        dynamics: {'coordinates' : { 'north' : 0, 'east' : 0, 'yaw' : 0}},
        robot: {
            'design' : {'ldu' : 0.04},
            'abaqus' : {},
            'components' : [
                {'type': 'ColorSensor', 'id': '37308C01', 'port': 'A', 'index': 0},
                {'type': 'ForceSensor', 'id': '37312C01', 'port': 'B', 'index': 0},
                {'type': 'DistanceSensor', 'id': '37316C01', 'port': 'C', 'index': 0},
                {'type': 'Motor', 'id': '54696', 'port': 'D', 'index': 0},
                {'type': 'Motor', 'id': '54675', 'port': 'E', 'index': 0},
                {'type': 'Motor', 'id': '54675', 'port': 'F', 'index': 1},
                {'type': 'Wheel', 'id': '39367PB01', 'port': 'E', 'spin': 1, 'index': 0},
                {'type': 'Wheel', 'id': '39367PB01', 'port': 'F', 'spin': 1, 'index': 1}
            ],
        },
        mat: 0,
        refresh: 1000,
        model: 'design.ldr',
        mcontent: '',
        abaqus: 'abaqus.xlsx',
        acontent: '',
        ...props,
    };

    /* ----------- Define HTML --------- */
    return (
        <mockContextScenario.Provider value={mockedValues}>
            {children}
        </mockContextScenario.Provider>
    );

}

function mockUseScenario() {

    return mockedValues;

};

export { mockWithScenario, mockUseScenario, MockProvider };
