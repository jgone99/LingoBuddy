'use client'

import { useState, useEffect } from 'react'
import SnowmanFigure from "./snowman-figure"
import Modal from '../matching/modal'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 'á', 'é', 'í', 'ó', 'ú']
const tilde_letters = ['a', 'e', 'i', 'o', 'u']
const tilde_variants= ['á', 'é', 'í', 'ó', 'ú']
var won = false

const SnowmanGame = ({ wordPair, getNewWord, updateHighscore }) => {
    const [ firstRender, setFirstRender ] = useState(true)
    const [ loading, setLoading ] = useState(true)
    const [ word, setWord ] = useState()
    const [ gameOver, setGameOver ] = useState(false)
    const [ maxErrors ] = useState(4)
    const [ errorCount, setErrorCount ] = useState(0)
    const [ gamesWon, setGamesWon ] = useState(0)
    const [ correctLetterCount, setCorrectLetterCount ] = useState(0)
    const [ showModal, setShowModal ] = useState(false)
    var testLoading = false
    

    useEffect(() => {
        if(firstRender) {
            setWord(wordPair)
            setFirstRender(false)
        }
        setLoading(false)
    })
    
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
        testLoading = true
        if (won) {
            setGamesWon(gamesWon+1)
        }
        else {
            setGamesWon(0)
        }
        setCorrectLetterCount(0)
        getNewWord().then(result => {
            console.log(loading)   
            setWord(result)
            setErrorCount(0)
            setGameOver(false)
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
        emptyBoxes.forEach((div) => {
            div.innerHTML=letter.toUpperCase()
            div.classList.remove('is-empty')
        })
    
        if(correctLetterCount+emptyBoxes.length >= word['spanish'].length) {
            won = true
            setShowModal(true)
            return
        }
    
        setCorrectLetterCount(correctLetterCount+emptyBoxes.length)
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
            won = false
            setShowModal(true)
        }
    }

    const resetAll = () => {
        playAgain()
    }

    const modalContinue = () => {
        resetAll()
        setShowModal(false)
    }
    
    return loading || testLoading ? 'Loading...' : (
        <>
            <div>
                {showModal && <Modal won={won} modalContinue={modalContinue} />}
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