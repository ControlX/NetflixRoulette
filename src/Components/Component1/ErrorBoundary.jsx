import React from 'react'

function ErrorBoundary(props){
    const ErrorText = () => (
        <h2>
            Something is not right here, please try again later...
        </h2>
    )

    let isError = false;

    return <>{!isError ? props.children : <ErrorText />}</>
}

export default ErrorBoundary