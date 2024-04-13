'use client'

import { useState, useTransition } from 'react'
import SnowmanFigure from "./snowman-figure"
import './snowman.css'
import Modal from '../modal'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ú"]
var won = false
var gamesWon = 0
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
    const [word, setWord] = useState(wordPair)
    const [errorCount, setErrorCount] = useState(0)
    const [correctLetterCount, setCorrectLetterCount] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [currentHighscore, setCurrentHighscore] = useState(highscore)
    const [isPending, startTransition] = useTransition()

    const maxScreenWidth = screen.width
    const maxScreenHeight = screen.height

    const resize = () => {
        const figureElement = document.querySelector('#figure-id')
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        if (screenWidth > 600) {
            figureElement.style.transform = `scale(${1.2 * Math.min(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight)})`
        }
    }

    window.addEventListener("resize", resize)

    const guessBoxes = () => {
        return String(word['spanish']).split('').map((letter, index) => {
            return <div key={letter + index} className={`flex mx-1 border-solid items-center justify-center rounded border-2 w-8 h-8 border-cyan-500 guessbox letter-${letter} is-empty`}></div>
        })
    }

    const resetGuessBoxes = () => {
        const boxes = document.querySelectorAll('.guessbox')
        boxes.forEach((div) => {
            div.innerHTML = ''
            div.classList.add('is-empty')
        })
    }

    const fetchAll = (data) => {
        Promise.all([getHighscore(), getNewWord()]).then(result => {
            setCurrentHighscore(result[0])
            setWord(result[1])
            gamesWon = won ? gamesWon + 1 : 0
            setCorrectLetterCount(0)
            setErrorCount(0)
            resetGuessBoxes()
            guessboxesFade(false)
            setFade(data, false, false, null, null)
        })
    }

    const playAgain = () => {
        const data = document.querySelector('.data')
        const guessboxes = document.querySelector('#guess-boxes')
        setFade(data, true, false, null, null)
        setFade(guessboxes, true, true, function callFetchAll(args, e, func) {
            console.log(e)
            guessboxes.removeEventListener(e.type, func)
            fetchAll(data)
        }, null)

    }

    const alphabetButtons = () => {
        return alphabetArray.map((letter, index) => {
            return <button key={'btn-' + letter + index} onClick={() => { buttonClicked(letter) }} className='alpha-button games-button' value={letter}>{letter.toUpperCase()}</button>
        })
    }

    const buttonClicked = (letter) => {
        const boxes = document.querySelectorAll(`.letter-${letter}`)
        if (boxes.length === 0) {
            errorMade()
            return
        }
        const emptyBoxes = document.querySelectorAll(`.letter-${letter}.is-empty`)

        emptyBoxes.forEach((div) => {
            div.innerHTML = letter.toUpperCase()
            div.classList.remove('is-empty')
        })

        if (correctLetterCount + emptyBoxes.length >= word['spanish'].length) {
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

        setCorrectLetterCount(correctLetterCount + emptyBoxes.length)
    }

    const guessboxesFade = (toFadeOut) => {
        const guessboxes = document.querySelector('#guess-boxes')
        setFade(guessboxes, toFadeOut)
    }

    const errorMade = () => {
        setErrorCount(errorCount + 1)
        if (errorCount + 1 >= maxErrors) {
            won = false
            setShowModal(true)
        }
    }

    const fadeOut = (element) => {
        if (element.classList.replace('fade-in', 'fade-out')) {
            console.log('replaced')
        } else {
            element.classList.add('fade-out')
            console.log('added')
        }

    }

    const fadeIn = (element) => {
        if (element.classList.replace('fade-out', 'fade-in')) {
            console.log('replaced')
        } else {
            element.classList.add('fade-in')
            console.log('added')
        }

    }

    const setFade = (element, toFadeOut, withListener, func, args) => {
        if (withListener) {
            element.addEventListener('animationend', function callbackFunc(e) {
                if (e.animationName == (toFadeOut ? 'fadeOut' : 'fadeIn')) {
                    console.log(`${toFadeOut ? 'fadeOut' : 'fadeIn'} ended`)
                    func(args, e, callbackFunc)
                }
            })
        }

        toFadeOut ? fadeOut(element) : fadeIn(element)
    }

    const modalFade = (toFadeOut) => {
        const modal = document.querySelector('.games-modal')
        console.log(modal)
        modal.addEventListener('animationend', (e) => {
            console.log('animationend')
            console.log(e)
            if (e.animationName == 'fadeOut') {
                console.log('fade out ended')
                setShowModal(false)
            }
        })
        setFade(modal, toFadeOut)
    }

    const resetSnowman = () => {
        const nose = document.querySelector('#nose')
        const leftHand = document.querySelector('#left-hand')
        const rightHand = document.querySelector('#right-hand')
        const head = document.querySelector('#head')

        switch (errorCount) {
            case 4: head.classList.add('head-fall-back')
            case 3: nose.classList.add('nose-fall-back')
            case 2: rightHand.classList.add('right-hand-fall-back')
            case 1: leftHand.classList.add('left-hand-fall-back')
        }
    }

    const modalContinue = () => {
        modalFade(true)
        //resetSnowman()
        console.log('play again')
        playAgain()
    }


    // FOR TESTING
    const resetUser = () => {
        if (resetUserProgress) {
            resetUserProgress()
        }
    }
    // FOR TESTING

    return (
        <>
            {/* FOR TESTING */}
            {/* <button className='absolute' onClick={resetUser}>RESET USER (TESTING)</button>
            <button className='absolute mt-32' onClick={() => {document.querySelector('#head').classList.toggle('head-fall-test')}}>(TESTING)</button> */}
            {/* FOR TESTING */}
            <div className='game-container'>
                {showModal && <Modal won={won} isPending={isPending} modalContinue={modalContinue} />}
                <div className='data'>
                    <div>HIGHSCORE: {currentHighscore}</div>
                    <div>SCORE: {gamesWon}</div>
                    <div className='my-10'>
                        <h4>WORD: {word['english'].toUpperCase()}</h4>
                    </div>
                </div>


                <div className='main-comps'>
                    <div id='figure-id' className='figure'>
                        <div>
                            <SnowmanFigure errors={errorCount} />
                        </div>
                    </div>
                    <div id='interactive' className='interactive'>
                        <div className='w-96'>
                            <div id='guess-boxes' className='flex justify-center guess-boxes'>
                                {guessBoxes()}
                            </div>
                            <div className="h-full">
                                <div className='flex flex-wrap justify-center'>
                                    {alphabetButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SnowmanGame