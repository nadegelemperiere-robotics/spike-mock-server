/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Rendering portal
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 february 2022
# Latest revision: 01 february 2022
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
