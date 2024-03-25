'use client'

import { useEffect, useState } from 'react'
import Modal from '../matching/modal'
import Connection from '../../components/matching/lines'

const english_lang = 'english'
const spanish_lang = 'spanish'
const matchTypeClasses = ['unmatched','selected','wrong-match','matched']

const MatchingGame = ({ matches, orders, getMoreMatches }) => {
    const [ firstWord, setFirstWord ] = useState(null)
    const [ matchesFound, setMatchesFound ] = useState(0)
    const [ wrong, setWrong ] = useState(false)
    const [ wrongWords, setWrongWords ] = useState([])
    const [ showModal, setShowModal ] = useState(false)
    const wordCount = matches.length

    const resetAll = () => {
        document.querySelectorAll('.word-card').forEach((wordCard) => {
            setToUnmatched(wordCard)
            setButtonActive(wordCard, true)
        })
        setMatchesFound(0)

    }

    const closeModal = () => {
        resetAll()
        fetchNewWordBatch()
        setShowModal(false)
    }

    const fetchNewWordBatch = () => {
        const newWords = getMoreMatches()
        matches = newWords['matches']
        orders = newWords['order']
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
        const matchesArray = [...matches]
        const ordersArray = [...orders]
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
                matches.forEach((match) => {
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

    return (
        <>
            <div className="container mx-auto my-8" >
                <svg id='connections'></svg>
                {showModal && <Modal closeModal={closeModal} />}
                <div className="grid grid-cols-4 gap-4">
                    {matchCards()}
                </div>
            </div>
        </>
    )
}

export default MatchingGame