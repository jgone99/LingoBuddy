'use client';

import Figure from '../components/figure'
import { useState } from 'react'

const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const Conditional = ({
    showWhen,
    childrenTrue,
    childrenFalse,
}) => {
    if (showWhen) {
        return <>{childrenTrue}</>
    }
    return <>{childrenFalse}</>
}

const GamesPage = () => {
    const [ word ] = useState("denotation")
    const [ gameOver, setGameOver ] = useState(false);
    const [ maxErrors ] = useState(6);
    const [ errors, setErrors ] = useState(0);

    function alphabetButtons() {
        return alphabetArray.map((letter) => {
            return <button className='m-1 text-white bg-blue-500 px-2 rounded' value={letter}>{letter}</button>
        })
    }

    function errorMade() {
        setErrors(errors + 1)
        if (errors + 1 >= maxErrors) {
            setGameOver(true)
        }
    }

    function reset() {
        setErrors(0)
        setGameOver(false)
    }

    return (
        <>
            <div className='text-center mb-20'>
                <h4>word: {word}</h4>
            </div>
            <div className="flex">
                <div className='mr-10'>
                    <div className='flex'>
                        <Figure errors={ errors } />
                    </div>
                    <p>{errors}</p>
                    <div className='flow-root'>
                        <Conditional showWhen={!gameOver} childrenTrue={
                            <div className="float-left">
                                <button onClick={errorMade}>Make Error</button>
                            </div>
                        } childrenFalse={
                            <div className="float-right">
                                <button onClick={reset}>Play Again</button>
                            </div>
                        }>
                        </Conditional>
                    </div>
                </div>
                <div>
                    <div className='mb-20'>guess: </div>
                    <div className="flex">
                        {alphabetButtons()}
                    </div>
                </div>
            </div>
        </>
    )
};

export default GamesPage;