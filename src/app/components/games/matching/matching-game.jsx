'use client'

import { useEffect, useState, useTransition } from 'react'
import Modal from '../modal'

const english_lang = 'english'
const spanish_lang = 'spanish'
const matchTypeClasses = ['unmatched','selected','wrong-match','matched']
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
    const [ currentHighscore, setCurrentHighscore ] = useState(highscore)
    const [ firstWord, setFirstWord ] = useState(null)
    const [ matchesFound, setMatchesFound ] = useState(0)
    const [ wrong, setWrong ] = useState(false)
    const [ wrongWords, setWrongWords ] = useState([])
    const [ showModal, setShowModal ] = useState(false)
    const [ wordPairs, setWordPairs ] = useState(matches)
    const [ wordOrder, setWordOrder ] = useState(orders)
    const [ isPending, startTransistion ] = useTransition()

    const wordCount = matches.length
    var isLoading = false

    const resetAll = () => {
        document.querySelectorAll('.word-card').forEach((wordCard) => {
            setToUnmatched(wordCard)
            setButtonActive(wordCard, true)
        })
        setMatchesFound(0)
    }

    const playAgain = () => {
        isLoading = true
        Promise.all([getMoreMatches(), getHighscore()]).then(result => {
            setWordPairs(result[0]['matches'])
            setWordOrder(result[0]['order'])
            setCurrentHighscore(result[1])
            resetAll()
            currentScore += won ? 1 : 0
            isLoading = false
        })
    }

    const modalContinue = () => {
        playAgain()
        setShowModal(false)
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
                <div key={`english-word-${index}`} content={order[0]} word-lang={english_lang} className={`word-card unmatched col-start-1 row-start-${index+1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
                    {order[0]}
                </div>)
            cards.push(
                <div key={`spanish-word-${index}`} content={order[1]} word-lang={spanish_lang} className={`word-card unmatched col-start-4 row-start-${index+1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
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
                    console.log(matchesFound+1)
                    console.log(wordCount)
                    if(matchesFound+1>=wordCount) {
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
                    setMatchesFound(matchesFound+1)
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

    return isLoading ? 'Loading...' : (
        <>
            <div className="container mx-auto my-8" >
                <div>Highest Score: {currentHighscore}</div>
                <div>Current Score: {currentScore}</div>
                <svg id='connections'></svg>
                {showModal && <Modal won={won} modalContinue={modalContinue} isPending={isPending} />}
                <div className="grid grid-cols-4 gap-4">
                    {matchCards()}
                </div>
            </div>
        </>
    )
}

export default MatchingGame