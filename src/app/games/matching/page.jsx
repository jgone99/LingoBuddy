'use client'

import { useEffect, useState } from 'react'
import Connection from '../../components/matching/curves'

const MatchingGame = () => {
    return (
        <>
            <div className="container mx-auto my-8">
                <svg id='connections'></svg>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div id='test-div' className="block p-4 border rounded hover:shadow-lg bg-black" draggable='true' onDrag={addConnection}>
                    <h3>Word</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MatchingGame