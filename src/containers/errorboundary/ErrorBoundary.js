/* -------------------------------------------------------
# TECHNOGIX
# -------------------------------------------------------
# Copyright (c) [2022] Technogix SARL
# All rights reserved
# -------------------------------------------------------
# Error boundary manager
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 february 2022
# Latest revision: 02 february 2022
# -------------------------------------------------------*/

/* React includes */
import React, { Component } from 'react';

/* Website includes */
import logMessage from '../../utils/logging';

class ErrorBoundary extends Component {

    constructor(props) {

        super(props);
        this.state = { error: null, errorInfo: null };

    }

    componentDidCatch(error, errorInfo) {

        // You can also log the error to an error reporting service
        logMessage(error, 'error');
        logMessage(errorInfo, 'error');
        this.setState({ error, errorInfo });

    }

    render() {

        if (this.state.errorInfo) {

            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );

        }
        return this.props.children;

    }

}

export default ErrorBoundary;
