import MatchingGame from '../../components/games/matching/matching-game'
import { query } from '../../db/queries'
import { mutate } from '../../db/mutations'
import { auth } from '@clerk/nextjs'

const MatchingPage = async() => {

    const { userId } = auth();

    const queryWords = async() => {
        'use server'

        const matchCount = 5
        var wordMatches = []
        var wordOrder = []
        
        wordMatches.length = 0;
        wordOrder.length = 0;
        const newWords = 
        `WITH words_num AS (
            SELECT *, ROW_NUMBER() OVER(ORDER BY RANDOM()) AS num
            FROM (
                SELECT *
                FROM word_pairs 
                ORDER BY RANDOM()
                LIMIT $1
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
        ON a.num = c.num`

        const ans = await query(newWords, [matchCount])
        
        ans.forEach((match) => {
            wordMatches.push([match['english'], match['spanish']])
            wordOrder.push([match['english_rand'], match['spanish_rand']])
        });
        return {
            'matches': wordMatches,
            'order': wordOrder,
        }
    }

    const getHighscore = async() => {
        'use server'

        const queryUserProgress =
        `SELECT matching_highscore FROM games_progress WHERE user_id = $1`

        try {
            const res = await query(queryUserProgress, [userId])
            console.log(`SERVER: successfully fetched highscore for ${userId}`)
            return res[0].matching_highscore
        } catch (error) {
            console.log(`SERVER: failed to fetch highscore for ${userId}`)
            throw error
        }
    }

    const updateHighscore = async(highscore) => {
        'use server'

        const ans = await getHighscore()

        if (ans >= highscore) {
            console.log('did not update. saved progression is ahead')
            return
        }

        const updateScoreQuery = 
        `UPDATE games_progress
        SET matching_highscore = $2
        WHERE user_id = $1`

        try {
            await mutate(updateScoreQuery, [userId, highscore])
            console.log(`SERVER: successfully updated ${userId}`)
        } catch (error) {
            console.log(`SERVER: failed to update ${userId}`)
            throw error
        }
    }

    const matchOrder = await queryWords()

    return (
        <>
            <MatchingGame matches={matchOrder['matches']} orders={matchOrder['order']} getMoreMatches={queryWords} highscore={await getHighscore()} getHighscore={getHighscore} updateHighscore={updateHighscore}/>
        </>
    )
}

export default MatchingPage