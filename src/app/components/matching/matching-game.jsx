'use client'

import { useEffect, useState } from 'react'
import Connection from '../../components/matching/lines'

const english_lang = 'english'
const spanish_lang = 'spanish'

const MatchingGame = ({ matches, orders }) => {
    const [ firstWord, setFirstWord ] = useState(null)
    const [ matchesFound, setMatchesFound ] = useState(0)

    const matchCards = () => {
        const matchesArray = [...matches]
        const ordersArray = [...orders]
        //matchesArray.forEach((match) => console.log(match));
        //ordersArray.forEach((order) => console.log(order));
        var cards = []
        ordersArray.forEach((order, index) => {
            cards.push(
                <div key={`english-word-${index}`} content={order[0]} word-lang={english_lang} className={`word-card text-center content-center col-start-1 row-start-${index+1} block w-28 h-16 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30`} onClick={buttonClick}>
                    {order[0]}
                </div>)
            cards.push(
                <div key={`spanish-word-${index}`} content={order[1]} word-lang={spanish_lang} className={`word-card text-center content-center col-start-4 row-start-${index+1} block w-28 h-16 border rounded hover:shadow-lg bg-cyan-500 bg-opacity-30`} onClick={buttonClick}>
                    {order[1]}
                </div>
            )
        })
        return cards
    }

    const buttonClick = (e) => {
        console.log('click')
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
                    wordCard.classList.replace('bg-cyan-500', 'bg-green-500')
                    firstWord.classList.add('pointer-events-none')
                    wordCard.classList.add('pointer-events-none')
                    setMatchesFound(matchesFound+1)
                }
                else {
                    firstWord.classList.replace('bg-green-500', 'bg-cyan-500')
                }
                setFirstWord(null)
            }
        }
        else {
            setFirstWord(wordCard)
            wordCard.classList.replace('bg-cyan-500', 'bg-green-500')
        }
    }

    const resetAll = () => {
        console.log('reset')
        setFirstWord(null)
        setMatchesFound(0)
        document.querySelectorAll('.word-card').forEach((card) => {
            card.classList.replace('bg-green-500', 'bg-cyan-500')
        })
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