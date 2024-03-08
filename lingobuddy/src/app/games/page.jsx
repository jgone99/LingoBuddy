'use client';

import Figure from '../components/figure'
import { use, useEffect, useState } from 'react'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const word_bank = { 
    0: ["purple", "morado"], 
    1: ["horse", "caballo"], 
    2: ["parasol", "sombrilla"], 
    3: ["beans", "frijoles"],
}

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
    const [ maxErrors ] = useState(6)
    const [ errorCount, setErrorCount ] = useState(0)
    const [ gamesWon, setGamesWon ] = useState(0)
    const [ correctLetterCount, setCorrectLetterCount ] = useState(0)

    useEffect(() => {
        if(firstRender) {
            const index = Math.floor(Math.random()*(Object.keys(word_bank).length))
            setWord({"englishWord":word_bank[index][0], "spanishWord":word_bank[index][1]})
            setFirstRender(false)
        }
        setLoading(false)
    })

    const playAgain = () => {
        setLoading(true)
        setErrorCount(0)
        const index = Math.floor(Math.random()*(Object.keys(word_bank).length))
        setWord({"englishWord":word_bank[index][0], "spanishWord":word_bank[index][1]})
        setGameOver(false)
        resetGuessBoxes()
        setLoading(false)
    }

    const guessBoxes = () => {
        console.log('guessBoxes')
        return String(word['spanishWord']).split('').map((letter) => {
            return <div className={`flex mx-1 border-solid items-center justify-center border-2 w-8 h-8 border-cyan-500 guessbox letter-${letter} is-empty`}></div>
        })
    }

    const resetGuessBoxes = () => {
        const boxes = document.querySelectorAll('.guessbox')
        boxes.forEach((div) => {
            div.innerHTML=''
            div.classList.add('is-empty')
        })
    }

    const buttonClicked = (letter) => {
        const boxes = document.querySelectorAll(`.letter-${letter}`)
        if(boxes.length === 0) {
            errorMade()
            return
        }

        const emptyBoxes = document.querySelectorAll(`.letter-${letter}.is-empty`)
        emptyBoxes.forEach((div) => {
            div.innerHTML=letter.toUpperCase()
            div.classList.remove('is-empty')
        })

        if(correctLetterCount+emptyBoxes.length >= word['spanishWord'].length) {
            endOfGame(true)
            return
        }

        setCorrectLetterCount(correctLetterCount+emptyBoxes.length)
    }

    const alphabetButtons = () => {
        return alphabetArray.map((letter) => {
            return <button onClick={() => {buttonClicked(letter)}} className='m-1 text-white bg-cyan-500 w-8 h-8 rounded hover:bg-cyan-800' value={letter}>{letter.toUpperCase()}</button>
        })
    }

    const endOfGame = (won) => {
        setGameOver(true)
        
        if(won) {
            setGamesWon(gamesWon+1)
        } else {
            setGamesWon(0)
        }

        setCorrectLetterCount(0)
    }

    const errorMade = () => {
        setErrorCount(errorCount+1)
        if (errorCount+1 >= maxErrors) {
            endOfGame(false)
        }
    }

    return loading ? 
        <>
            <div>
                Loading...
            </div>
        </> : (
        <>
            <div className='text-center'>TEST PAGE</div>
            <div className="text-center">GAMES WON: {gamesWon}</div>
            <div className='text-center mb-20'>
                <h4>WORD: {word['englishWord'].toUpperCase()}</h4>
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
                                <button onClick={playAgain} className='bg-cyan-500 rounded text-white px-2 hover:bg-cyan-800'>Play Again</button> 
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