import React from "react"
import './small-sign-figure.css'

const SmallSignFigure = ({ word }) => {
    return (
        <>
            <div className="small-sign-box">
                {word}
                <div className="small-stick"></div>
            </div>
        </>
    )
}

export default SmallSignFigure