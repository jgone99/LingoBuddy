'use client';

import Figure from '../components/figure'
import { useEffect, useState } from 'react'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const word_bank = [ "denotation", "elementary", "car", "waffle" ]

const Conditional = ({
    showWhen,
    children,
}) => {
    if (showWhen) {
        return <>{children}</>
    }
}


const GamesPage = () => {
    const [ firstRender, setFirstRender ] = useState(true)
    const [ loading, setLoading ] = useState(true)
    const [ word, setWord ] = useState()
    const [ gameOver, setGameOver ] = useState(false)
    const [ playAgain, setPlayAgain ] = useState(false)
    const [ maxErrors ] = useState(6)
    const [ errorCount, setErrorCount ] = useState(0)

    useEffect(() => {
        if((gameOver && playAgain) || firstRender) {
            setWord(word_bank[Math.floor(Math.random()*(word_bank.length))])
            setFirstRender(false)
            setPlayAgain(false)
            setGameOver(false)
            resetGuessBoxes()
        }
        setLoading(false)
    })

    const guessBoxes = () => {
        console.log('guessBoxes')
        return String(word).split('').map((letter) => {
            return <div className={`flex mx-1 border-solid items-center justify-center border-2 w-8 h-8 border-cyan-500 guessbox letter-${letter}`}></div>
        })
    }

    const resetGuessBoxes = () => {
        const boxes = document.querySelectorAll('.guessbox')
        boxes.forEach((div) => {div.innerHTML=''})
    }

    const buttonClicked = (letter) => {
        const boxes = document.querySelectorAll('.letter-'+letter)
        if(boxes.length > 0) {
            boxes.forEach((div) => {div.innerHTML=letter.toUpperCase()})
            return
        }
        errorMade()
    }

    const alphabetButtons = () => {
        return alphabetArray.map((letter) => {
            return <button onClick={() => {buttonClicked(letter)}} className='m-1 text-white bg-cyan-500 w-8 h-8 rounded hover:bg-cyan-800' value={letter}>{letter.toUpperCase()}</button>
        })
    }

    const errorMade = () => {
        setErrorCount(errorCount + 1)
        if (errorCount + 1 >= maxErrors) {
            setGameOver(true)
        }
    }

    const reset = () => {
        setErrorCount(0)
        setPlayAgain(true)
    }

    return loading ? 
        <>
            <div>
                Loading...
            </div>
        </> : (
        <>
            <div className='text-center'>TEST PAGE</div>
            <div className='text-center mb-20'>
                <h4>WORD: {word.toUpperCase()}</h4>
            </div>
            <div className="flex m-20">
                <div className='mr-10'>
                    <div className='flex'>
                        <Figure errors={ errorCount } />
                    </div>
                </div>
                <div className='w-96'>
                    <div className='mb-20 flex justify-center'>
                        {guessBoxes()}
                    </div>
                    <div className="w-96">
                        {gameOver ? (
                            <div className='flex justify-center'>
                                <button onClick={reset} className='bg-cyan-500 rounded text-white px-2 hover:bg-cyan-800'>Play Again</button> 
                            </div>
                            ) : (
                                <div className='grid grid-cols-9 justify-items-center'>
                                    {alphabetButtons()}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default GamesPage;