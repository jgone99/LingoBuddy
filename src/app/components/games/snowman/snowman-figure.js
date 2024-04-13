import React from "react"
import './snowman-figure.css'

const SnowmanFigure = ({ errors }) => {
    return (
        <>
            <div className="snowman-box">
                <div className="body">
                    <div id='head' className={`head-container ${errors > 3 && 'head-fall'}`}>
                        <div className={"head"}>
                            <div className="hat"></div>
                            <div className="eyes"></div>
                        </div>
                    </div>
                    <div id="nose" className={`nose ${errors > 2 && 'nose-fall'}`}></div>
                    {/* <div id="nose2"  className={`nose2 ${errors > 2}`}></div> */}
                    <div className="scarf"></div>
                    <div className="buttons"></div>
                    <div className="hands">
                        <div id="left-hand" className={`left-hand ${errors > 0 && 'left-hand-fall'}`}></div>
                        <div id="right-hand" className={`right-hand ${errors > 1 && 'right-hand-fall'}`}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SnowmanFigure