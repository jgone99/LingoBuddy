import React from "react"
import './big-sign-figure.css'

const BigSignFigure = ({ word }) => {
    return (
        <>
            <div className="big-sign-box">
                {word}
                <div className="big-stick"></div>
            </div>
        </>
    )
}

export default BigSignFigure