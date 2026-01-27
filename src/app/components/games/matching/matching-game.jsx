'use client'

import { useEffect, useState, useTransition } from 'react'
import Modal from '../modal'
import './matching.css'
import { once } from 'events'

const english_lang = 'english'
const spanish_lang = 'spanish'
const matchTypeClasses = ['unmatched', 'selected', 'wrong-match', 'matched']
var currentScore = 0;
var won = false

const MatchingGame = ({
    matches,
    orders,
    getMoreMatches,
    highscore,
    getHighscore,
    updateHighscore
}) => {
    const [currentHighscore, setCurrentHighscore] = useState(highscore)
    const [firstWord, setFirstWord] = useState(null)
    const [matchesFound, setMatchesFound] = useState(0)
    const [wrong, setWrong] = useState(false)
    const [wrongWords, setWrongWords] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [wordPairs, setWordPairs] = useState(matches)
    const [wordOrder, setWordOrder] = useState(orders)
    const [isPending, startTransistion] = useTransition()

    const wordCount = matches.length

    const resetAll = () => {
        document.querySelectorAll('.word-card').forEach((wordCard) => {
            setToUnmatched(wordCard)
            setButtonActive(wordCard, true)
        })
        setMatchesFound(0)
    }

    const playAgain = () => {
        const data = document.querySelector('.data')
        const cards = document.querySelector('.word-cards')
        setFade(data, true, false, null, null);
        setFade(cards, true, true, function callFetchAll(args, e, func) {
            cards.removeEventListener(e.type, func)
            fetchAll(data, cards)
        }, null)
    }

    const fetchAll = (data, cards) => {
        Promise.all([getMoreMatches(), getHighscore()]).then(result => {
            setWordPairs(result[0]['matches'])
            setWordOrder(result[0]['order'])
            setCurrentHighscore(result[1])
            resetAll()
            currentScore += won ? 1 : 0
            setFade(data, false, false, null, null)
            setFade(cards, false, false, null, null)
        })
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
        }, { once: true })
        setFade(modal, toFadeOut)
    }

    const modalContinue = () => {
        modalFade(true)
        playAgain()
    }

    const setToMatched = (element) => {
        matchTypeClasses.forEach((matchClass) => {
            element.classList.replace(matchClass, 'matched')
        })
    }

    const setToUnmatched = (element) => {
        matchTypeClasses.forEach((matchClass) => {
            element.classList.replace(matchClass, 'unmatched')
        })
    }

    const setToSelected = (element) => {
        matchTypeClasses.forEach((matchClass) => {
            element.classList.replace(matchClass, 'selected')
        })
    }

    const setToWrongMatch = (element) => {
        matchTypeClasses.forEach((matchClass) => {
            element.classList.replace(matchClass, 'wrong-match')
        })
    }

    const setButtonActive = (element, bool) => {
        if (bool) {
            element.classList.remove('pointer-events-none')
            return
        }
        element.classList.add('pointer-events-none')
    }

    const matchCards = () => {
        console.log('matchcards')
        const matchesArray = [...wordPairs]
        const ordersArray = [...wordOrder]
        var cards = []
        ordersArray.forEach((order, index) => {
            cards.push(
                <div key={`english-word-${index}`} content={order[0]} word-lang={english_lang} className={`word-card unmatched col-start-1 row-start-${index + 1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
                    {order[0]}
                </div>)
            cards.push(
                <div key={`spanish-word-${index}`} content={order[1]} word-lang={spanish_lang} className={`word-card unmatched col-start-4 row-start-${index + 1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
                    {order[1]}
                </div>
            )
        })
        return cards
    }

    const buttonClick = (e) => {
        console.log('click')
        resetWords()
        const wordCard = e.target
        var matchFound = false
        if (firstWord !== null) {
            if (wordCard.getAttribute('word-lang') !== firstWord.getAttribute('word-lang')) {
                wordPairs.forEach((match) => {
                    const isMatch = (firstWord.getAttribute('content') == match[0] && wordCard.getAttribute('content')) == match[1] || (wordCard.getAttribute('content') == match[0] && firstWord.getAttribute('content') == match[1])
                    console.log(isMatch)
                    matchFound = matchFound || isMatch
                })
                if (matchFound) {
                    setToMatched(firstWord)
                    setToMatched(wordCard)
                    setButtonActive(firstWord, false)
                    setButtonActive(wordCard, false)
                    console.log(matchesFound + 1)
                    console.log(wordCount)
                    if (matchesFound + 1 >= wordCount) {
                        won = true
                        if (currentScore + 1 > currentHighscore) {
                            startTransistion(() => {
                                updateHighscore(currentScore + 1).then(result => {
                                    console.log('CLIENT: updated user')
                                })
                            })
                        }
                        setShowModal(true)
                    }
                    setMatchesFound(matchesFound + 1)
                }
                else {
                    setToWrongMatch(firstWord)
                    setToWrongMatch(wordCard)
                    setWrongWords([firstWord, wordCard])
                    setWrong(true)
                }
                setFirstWord(null)
            }
        }
        else {
            setFirstWord(wordCard)
            setToSelected(wordCard)
        }
    }

    const resetWords = () => {
        console.log('reset')
        if (wrong) {
            setToUnmatched(wrongWords[0])
            setToUnmatched(wrongWords[1])
            setWrong(false)
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
            }, { once: true })
        }

        toFadeOut ? fadeOut(element) : fadeIn(element)
    }

    return (
        <>
            <div className="game-container flex flex-grow" >
                {showModal && <Modal won={won} modalContinue={modalContinue} isPending={isPending} />}
                <div className='data'>
                    <div>Highest Score: {currentHighscore}</div>
                    <div>Current Score: {currentScore}</div>
                </div>
                <div className='main-comps'>
                    <div className='word-cards'>
                        <div className="grid grid-cols-4 gap-4">
                            {matchCards()}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MatchingGame