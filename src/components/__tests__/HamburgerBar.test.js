/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Hamburger bar for mobile navigation testing
# -------------------------------------------------------
# Nadège LEMPERIERE, @06 march 2022
# Latest revision: 06 march 2022
# -------------------------------------------------------*/

/* React includes */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

/* Website includes */
import HamburgerBar from '../hamburgermenu/HamburgerBar';
import Config from '../../config';
import { ConfigProvider } from '../../providers';

/* Mocks includes */
import { MockProvider as MockMenuProvider, mockUseMenu } from '../../providers/Menu/Mock.js';
import { MockProvider as MockLocaleProvider, mockUseLocale } from '../../providers/Locale/Mock.js';

/* Tests includes */
import { screen } from '@testing-library/react';

jest.mock('../../providers', () => ({
    ...jest.requireActual('../../providers'),
    useMenu: (() => { return mockUseMenu(); }),
    useLocale: (() => { return mockUseLocale(); }),
}));

test('Should change bar theme when user is sliding', () => {

    /* eslint-disable testing-library/no-unnecessary-act, testing-library/no-node-access */
    act(() => {

        ReactDOM.render(
            <React.StrictMode>
                <ConfigProvider appConfig={Config}>
                    <MockLocaleProvider>
                        <MockMenuProvider isSliding={true}>
                            <HamburgerBar />
                        </MockMenuProvider>
                    </MockLocaleProvider>
                </ConfigProvider>
            </React.StrictMode>,
            document.getElementById('root')
        );

    })
    /* eslint-disable testing-library/no-unnecessary-act, testing-library/no-node-access */
    
    expect(screen.getByPlaceholderText('hamburgerbar')).toBeTruthy();
    /*expect(screen.getByPlaceholderText('hamburgerbar')).toHaveStyle('background-color: rgb(35, 168, 212);');*/

});