
import SnowmanGame from '../../components/SnowmanGame';
import { query } from '../../db/queries';

const GamesPage = () => {
    
    const getLearningLevel = async() => {
        const level_id = await query('SELECT level_id FROM learning_levels')
        console.log(level_id)
        return <div>learning level: {level_id}</div>
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