
import SnowmanGame from '../../components/snowman/snowman-game';
import { query } from '../../db/queries';

const GamesPage = () => {
    
    const getLearningLevel = async() => {
        const ans = await query("SELECT question_text FROM checkpoint_questions where level_id = 1 order by question_id")
        console.log(ans)
        return <div>learning level: {ans[1]['question_text']}</div>
    }

    return (
        <>
            {getLearningLevel()}
            <div className='text-center'>TEST PAGE</div>
            <SnowmanGame />
        </>
    )
};

export default GamesPage;