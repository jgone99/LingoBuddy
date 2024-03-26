
import MatchingGame from '../../components/matching/matching-game'
import { query } from '../../db/queries'

const matchCount = 5
var wordMatches = []
var wordOrder = []

const queryWords = async() => {
    'use server'
    wordMatches.length = 0;
    wordOrder.length = 0;
    const ans = await query(
        `WITH words_num AS (
            SELECT *, ROW_NUMBER() OVER(ORDER BY RANDOM()) AS num
            FROM (
                SELECT *
                FROM word_pairs 
                ORDER BY RANDOM()
                LIMIT ${matchCount}
            ) words
        ), english_rand AS (
            SELECT *, ROW_NUMBER() OVER(ORDER BY RANDOM()) AS num
            FROM (
                SELECT english
                FROM words_num
            ) english
        ), spanish_rand AS (
            SELECT *, ROW_NUMBER() OVER(ORDER BY RANDOM()) AS num
            FROM (
                SELECT spanish
                FROM words_num
            ) spanish
        )
        SELECT a.english, a.spanish, b.english AS english_rand, c.spanish AS spanish_rand
        FROM words_num a
        RIGHT JOIN
        english_rand b
        ON a.num = b.num
        RIGHT JOIN
        spanish_rand c
        ON a.num = c.num;`
    )
    
    ans.forEach((match) => {
        wordMatches.push([match['english'], match['spanish']])
        wordOrder.push([match['english_rand'], match['spanish_rand']])
    });
    return {
        'matches': wordMatches,
        'order': wordOrder,
    }
}

const matchOrder = await queryWords()

const MatchingPage = async() => {
    return (
        <>
            <MatchingGame matches={matchOrder['matches']} orders={matchOrder['order']} getMoreMatches={queryWords}/>
        </>
    )
}

export default MatchingPage