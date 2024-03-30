'use client'

import { useState, useEffect, useTransition } from 'react'
import SnowmanFigure from "./snowman-figure"
import Modal from '../modal'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ú"]
var won = false
var gamesWon = 0
var testLoading = false
const maxErrors = 4

const SnowmanGame = ({ 
    highscore, 
    getHighscore, 
    wordPair, 
    getNewWord, 
    updateHighscore,
    
    // FOR TESTING
    resetUserProgress
    // FOR TESTING 
}) => {
    const [ word, setWord ] = useState(wordPair)
    const [ errorCount, setErrorCount ] = useState(0)
    const [ correctLetterCount, setCorrectLetterCount ] = useState(0)
    const [ showModal, setShowModal ] = useState(false)
    const [ currentHighscore, setCurrentHighscore ] = useState(highscore)
    const [ isPending, startTransition ] = useTransition()
    
    const guessBoxes = () => {
        return String(word['spanish']).split('').map((letter, index) => {
            return <div key={letter+index} className={`flex mx-1 border-solid items-center justify-center rounded border-2 w-8 h-8 border-cyan-500 guessbox letter-${letter} is-empty`}></div>
        })
    }
    
    const resetGuessBoxes = () => {
        const boxes = document.querySelectorAll('.guessbox')
        boxes.forEach((div) => {
            div.innerHTML=''
            div.classList.add('is-empty')
        })
    }
    
    const playAgain = () => {
        testLoading = true;
        
        Promise.all([getHighscore(), getNewWord()]).then(result => {
            setCurrentHighscore(result[0])
            setWord(result[1])
            gamesWon += 1
            setCorrectLetterCount(0)
            setErrorCount(0)
            resetGuessBoxes()
            testLoading = false
        })
    }
    
    const alphabetButtons = () => {
        return alphabetArray.map((letter, index) => {
            return <button key={'btn-'+letter+index} onClick={() => {buttonClicked(letter)}} className='m-1 text-white w-8 h-8 rounded hover:bg-cyan-800' value={letter}>{letter.toUpperCase()}</button>
        })
    }
    
    const buttonClicked = (letter) => {
        const boxes = document.querySelectorAll(`.letter-${letter}`)
        if(boxes.length === 0) {
            errorMade()
            return
        }
        const emptyBoxes = document.querySelectorAll(`.letter-${letter}.is-empty`)

        testLoading = true
        emptyBoxes.forEach((div) => {
            div.innerHTML=letter.toUpperCase()
            div.classList.remove('is-empty')
        })
        testLoading = false
    
        if(correctLetterCount+emptyBoxes.length >= word['spanish'].length) {
            won = true
            if (gamesWon + 1 > currentHighscore) {
                startTransition(() => {
                    updateHighscore(gamesWon + 1).then(result => {
                        console.log('CLIENT: user updated')
                    })
                })
            }
            setShowModal(true)
            return
        }
    
        setCorrectLetterCount(correctLetterCount+emptyBoxes.length)
    }
    
    const errorMade = () => {
        setErrorCount(errorCount+1)
        if (errorCount+1 >= maxErrors) {
            won = false
            setShowModal(true)
        }
    }

    const modalContinue = () => {
        playAgain()
        setShowModal(false)
    }
    

    // FOR TESTING
    const resetUser = () => {
        if(resetUserProgress) {
            resetUserProgress()
        }
    }
    // FOR TESTING

    return  testLoading ? 'Loading...' : (
        <>
            <div>
                {showModal && <Modal won={won} isPending={isPending} modalContinue={modalContinue} />}
                <div className="text-center">HIGHSCORE: {currentHighscore}</div>
                <div className="text-center">SCORE: {gamesWon}</div>
                <div className='text-center mb-20'>
                    <h4>WORD: {word['english'].toUpperCase()}</h4>
                </div>
                <div className="flex m-20">
                    <div className='mr-10'>
                        <div className=''>
                            <SnowmanFigure errors={ errorCount } />
                        </div>
                    </div>

                    {/* FOR TESTING */}
                    <div>
                        <button onClick={resetUser}>RESET USER (TESTING)</button>
                    </div>
                    {/* FOR TESTING */}

                    <div className='w-96 ml-80 mt-40'>
                        <div className='mb-20 flex justify-center'>
                            {guessBoxes()}
                        </div>
                        <div className="h-full">
                            <div className='grid grid-cols-9 justify-items-center'>
                                {alphabetButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SnowmanGame