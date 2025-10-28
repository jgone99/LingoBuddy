import SnowmanGame from '../../components/games/snowman/snowman-game';
import { query } from '../../db/queries';
import { mutate } from '../../db/mutations';
import { auth } from '@clerk/nextjs';

const SnowmanPage = async () => {

    const { userId } = auth()

    const getWordPair = async () => {
        'use server'

        const queryWord = `SELECT * FROM word_pairs ORDER BY RANDOM() LIMIT 1`

        try {
            const res = await query(queryWord)
            console.log(`SERVER: succcessfully fetched new word for ${userId}`)
            return res[0]
        } catch (error) {
            console.log(`SERVER: failed to fetch new word for ${userId}`)
            throw error
        }


    }

    const getHighscore = async () => {
        'use server'

        const queryUserProgress =
            `SELECT snowman_highscore FROM progress WHERE user_id=$1`

        try {
            const res = await query(queryUserProgress, [userId])
            console.log(res)
            console.log(`SERVER: successfully fetched highscore for ${userId}`)
            return res[0].snowman_highscore
        } catch (error) {
            console.log(`SERVER: failed to fetch highscore for ${userId}`)
            throw error
        }
    }

    const updateHighscore = async (highscore) => {
        'use server'

        const ans = await getHighscore()

        if (ans >= highscore) {
            console.log('did not update. saved progression is ahead')
            return
        }

        const updateScoreQuery =
            `UPDATE progress
        SET snowman_highscore=$2
        WHERE user_id=$1`

        try {
            await mutate(updateScoreQuery, [userId, highscore])
            console.log(`SERVER: successfully updated ${userId}`)
        } catch (error) {
            console.log(`SERVER: failed to update ${userId}`)
            throw error
        }
    }

    // FOR TESTING
    const resetUserProgress = async () => {
        'use server'
        await query("UPDATE progress SET matching_highscore = 0, snowman_highscore = 0 WHERE user_id = $1",
            [userId])
        console.log(`RESET: ${userId}`)
    }
    // FOR TESTING

    return (
        <>
            <SnowmanGame
                highscore={await getHighscore()}
                getHighscore={getHighscore}
                wordPair={await getWordPair()}
                getNewWord={getWordPair}
                updateHighscore={updateHighscore}

                // FOR TESTING
                resetUserProgress={resetUserProgress}
            // FOR TESTING
            />
        </>
    )
};

export default SnowmanPage;