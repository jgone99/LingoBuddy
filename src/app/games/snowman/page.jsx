
import SnowmanGame from '../../components/snowman/snowman-game';
import { query } from '../../db/queries';
import { mutate } from '../../db/mutations';

const getWordPair = async() => {
    'use server'
    const ans = (await query("SELECT * FROM word_pairs ORDER BY RANDOM() LIMIT 1"))[0]
    console.log(ans)
    return ans
}

const updateHighscore = async(userId, highscore) => {
    'use server'
    mutate(`
    UPDATE games_progress
    SET snowman_highscore=${highscore}
    WHERE user_id=${userId}
    `)
}

const SnowmanPage = async() => {
    return (
        <>
            <div className='text-center'>TEST PAGE</div>
            <SnowmanGame wordPair={await getWordPair()} getNewWord={getWordPair} updateHighscore={updateHighscore}/>
        </>
    )
};

export default SnowmanPage;