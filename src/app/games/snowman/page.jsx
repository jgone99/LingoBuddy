'use server'

import SnowmanGame from '../../components/snowman/snowman-game';
import { query } from '../../db/queries';

const SnowmanPage = async() => {
    const getWordPair = async() => {
        'use server'
        const ans = (await query("SELECT * FROM word_pairs ORDER BY RANDOM() LIMIT 1"))[0]
        console.log(ans)
        return ans
    }

    return (
        <>
            <div className='text-center'>TEST PAGE</div>
            <SnowmanGame wordPair={await getWordPair()} getNewWord={getWordPair}/>
        </>
    )
};

export default SnowmanPage;