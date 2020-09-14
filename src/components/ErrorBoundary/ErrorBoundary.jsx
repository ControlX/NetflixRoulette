import React from 'react'

function ErrorBoundary(props){
    const ErrorText = () => (
        <p className="parent-general-message">
            Something is not right here, please try again later...
        </p>
    )

    // let isError = props.isError;

    return <>{!props.isError ? props.children : <ErrorText />}</>
}

export default ErrorBoundary