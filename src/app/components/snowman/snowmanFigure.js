import React from "react"
import './snowman.css'

const SnowmanFigure = ({ errors }) => {
    return (
        <>
            <div className="snowman-box">
                <div className="body">
                    <div className={`head-container ${errors > 3 && 'animate-[head-fall1_1.2s_linear_forwards,head-fall2_1.5s_ease-in-out_forwards,head-fall3_0.8s_ease-in_0.4s_forwards]'}`}>
                    <div className={"head"}>
                        <div className="hat"></div>
                        <div className="eyes"></div>
                    </div>
                    </div>
                    <div className={`nose ${errors > 2 && 'animate-[nose-fall_0.7s_ease-in_forwards]'}`}></div>
                    <div className="scarf"></div>
                    <div className="buttons"></div>
                    <div className="hands">
                        <div className={`left-hand ${errors > 0 && 'animate-[left-hand-fall_0.7s_ease-in_forwards]'}`}></div>
                        <div className={`right-hand ${errors > 1 && 'animate-[right-hand-fall_0.7s_ease-in_forwards]'}`}></div>
                    </div>
                </div>
            </div>
    </>
    )
}

export default SnowmanFigure