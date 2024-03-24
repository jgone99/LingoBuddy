'use client'

import { useEffect, useState } from 'react'
import Connection from '../../components/matching/lines'

const english_lang = 'english'
const spanish_lang = 'spanish'

const MatchingGame = ({ matches, orders }) => {
    const [ firstWord, setFirstWord ] = useState(null)
    const [ matchesFound, setMatchesFound ] = useState(0)
    const [ wrong, setWrong ] = useState(false)
    const [ wrongWords, setWrongWords ] = useState([])

    const matchCards = () => {
        const matchesArray = [...matches]
        const ordersArray = [...orders]
        //matchesArray.forEach((match) => console.log(match));
        //ordersArray.forEach((order) => console.log(order));
        var cards = []
        ordersArray.forEach((order, index) => {
            cards.push(
                <div key={`english-word-${index}`} content={order[0]} word-lang={english_lang} className={`word-card unmatched text-center content-center col-start-1 row-start-${index+1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
                    {order[0]}
                </div>)
            cards.push(
                <div key={`spanish-word-${index}`} content={order[1]} word-lang={spanish_lang} className={`word-card unmatched text-center content-center col-start-4 row-start-${index+1} block border rounded hover:shadow-lg`} onClick={buttonClick}>
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
                    firstWord.classList.replace('selected', 'matched')
                    wordCard.classList.replace('unmatched', 'matched')
                    firstWord.classList.add('pointer-events-none')
                    wordCard.classList.add('pointer-events-none')
                    setMatchesFound(matchesFound+1)
                }
                else {
                    firstWord.classList.replace('selected', 'wrong-match')
                    wordCard.classList.replace('unmatched', 'wrong-match')
                    setWrongWords([firstWord, wordCard])
                    setWrong(true)
                }
                setFirstWord(null)
            }
        }
        else {
            setFirstWord(wordCard)
            wordCard.classList.replace('unmatched', 'selected')
        }
    }

    const resetWords = () => {
        console.log('reset')
        if (wrong) {
            wrongWords[0].classList.replace('wrong-match', 'unmatched')
            wrongWords[1].classList.replace('wrong-match', 'unmatched')
            setWrong(false)
        }
    }

    return (
        <>
            <div>{matchesFound}</div>
            <div className="container mx-auto my-8" >
                <svg id='connections'></svg>
                <div className="grid grid-cols-4 gap-4">
                    {matchCards()}
                </div>
            </div>
        </>
    )
}

export default MatchingGame