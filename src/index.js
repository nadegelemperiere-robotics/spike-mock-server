/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Rendering mock client
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
# -------------------------------------------------------*/

/* React includes */
import React from 'react';
import { createRoot } from 'react-dom/client';

/* Emotion includes */
import createCache from '@emotion/cache'; // eslint-disable-line import/no-extraneous-dependencies
import { CacheProvider } from '@emotion/react'; // eslint-disable-line import/no-extraneous-dependencies

/* Local includes */
import App from './App';

const nonce = Math.random().toString(16).substr(2, 21);
const nonceCache = createCache({
    key: 'spike-mock',
    nonce: nonce,
    prepend: true,
});

window.__webpack_nonce__ = nonce;
/* global __webpack_nonce__ */ // eslint-disable-line no-unused-vars
__webpack_nonce__ = window.__webpack_nonce__;// eslint-disable-line no-native-reassign, no-global-assign


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CacheProvider value={nonceCache}>
            <App />
        </CacheProvider>
    </React.StrictMode>
);
