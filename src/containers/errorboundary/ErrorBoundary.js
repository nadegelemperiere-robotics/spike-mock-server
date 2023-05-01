/* ------------------------------------------------------
# Copyright (c) [2023] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
# Error Boundary Manager
# -------------------------------------------------------
# Nadège LEMPERIERE, @01 may 2023
# Latest revision: 01 may 2023
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
        logMessage('Error', error);
        logMessage('Error', errorInfo);
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
