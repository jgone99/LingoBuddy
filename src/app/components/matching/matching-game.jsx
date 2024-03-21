'use client'

import { useEffect, useState } from 'react'
import Connection from '../../components/matching/lines'

const MatchingGame = ({ matches }) => {
    const [ firstWordSelected, setFirstWordSelected ] = useState(false)
    const [ secondWordSelected, setSecondWordSelected ] = useState(false)
    const [ firstWord, setFirstWord ] = useState()
    const [ secondWord, setSecondWord ] = useState()

    const matchCards = () => {
        console.log(matches)
    }

    const buttonClick = (e) => {
        console.log('click')
        const wordCard = e.target
        if (firstWordSelected) {
            if (firstWord.getAttribute('content') === wordCard.getAttribute('content')) {
                firstWord.classList.replace('bg-cyan-500', 'bg-green-500')
                wordCard.classList.replace('bg-cyan-500', 'bg-green-500')
            }
            else {
                firstWord.classList.replace('bg-green-500', 'bg-cyan-500')
            }
                setFirstWord(null)
                setFirstWordSelected(false)
        }
        else {
            setFirstWord(wordCard)
            wordCard.classList.replace('bg-cyan-500', 'bg-green-500')
            setFirstWordSelected(true)
        }
    }

    const resetMatching = () => {
        console.log('reset')
        setFirstWord(null)
        firstWord.classList.replace('bg-green-500', 'bg-cyan-500')
        setFirstWordSelected(false)
    }

    return (
        <>
            {matchCards()}
            <div className="container mx-auto my-8" >
                <svg id='connections'></svg>
                <div className="grid grid-cols-6 gap-4">
                    <div id='word1'content='a' className="col-start-1 row-start-1 block p-4 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30" draggable='true' onClick={buttonClick}>
                        <h3 id='word1' className='pointer-events-none'>a</h3>
                    </div>
                    <div id='word2' content='b' className="col-start-6 row-start-1 block p-4 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30" draggable='true' onClick={buttonClick}>
                        <h3 className='pointer-events-none'>b</h3>
                    </div>
                    <div id='word3' content='b' className="col-start-1 row-start-2 block p-4 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30" draggable='true' onClick={buttonClick}>
                        <h3 id='word1' className='pointer-events-none'>b</h3>
                    </div>
                    <div id='word4' content='a' className="col-start-6 row-start-2 block p-4 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30" draggable='true' onClick={buttonClick}>
                        <h3 className='pointer-events-none'>a</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MatchingGame