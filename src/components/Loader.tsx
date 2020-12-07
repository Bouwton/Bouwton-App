import React from 'react'

export const Loader = (props: {content: string}) => {
    let loadingMessage = "Bezig met laden" + (props.content !== "" ? " van " + props.content : "");

    return <div className="d-flex flex-column justify-content-center m-5">
        <div className="align-self-center">
            <div className="spinner-border text-primary" role="status" />
        </div>
        <div className="align-self-center mt-4">
            <strong>{loadingMessage}</strong>
        </div>
    </div>
}