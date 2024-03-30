
import SnowmanGame from '../../components/snowman/snowman-game';
import { query } from '../../db/queries';
import { mutate } from '../../db/mutations';
import { auth } from '@clerk/nextjs';

const { userId } = auth()

const getWordPair = async() => {
    'use server'
    const ans = (await query("SELECT * FROM word_pairs ORDER BY RANDOM() LIMIT 1"))[0]
    console.log(ans)
    return ans
}

const getHighscore = async() => {
    'use server'

    const queryUserProgress =
    `SELECT snowman_highscore FROM games_progress WHERE user_id=$1`

    const res = await query(queryUserProgress, [userId])
    console.log(res[0].snowman_highscore)
    return res[0].snowman_highscore
}

const updateHighscore = async(highscore) => {
    'use server'

    const updateScoreQuery = 
    `UPDATE games_progress
    SET snowman_highscore=$2
    WHERE user_id=$1`

    const res = await mutate(updateScoreQuery, [userId, highscore])
    return res;
}

console.log(userId)

const highscore = await getHighscore()

const SnowmanPage = async() => {
    return (
        <>
            <SnowmanGame highscore={highscore} getHighscore={getHighscore} wordPair={await getWordPair()} getNewWord={getWordPair} updateHighscore={updateHighscore}/>
        </>
    )
};

export default SnowmanPage;