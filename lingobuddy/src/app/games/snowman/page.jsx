
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
            {/* <div className="text-center">GAMES WON: {gamesWon}</div>
            <div className='text-center mb-20'>
                <chosenWord />
                <h4>WORD: {word['englishWord'].toUpperCase()}</h4>
            </div>
            <div className="flex m-20">
                <div className='mr-10'>
                    <div className=''>
                        <SnowmanFigure errors={ errorCount } />
                    </div>
                </div>
                <div className='w-96 ml-80 mt-40'>
                    <div className='mb-20 flex justify-center'>
                        {guessBoxes()}
                    </div>
                    <div className="h-full">
                        {gameOver ? (
                            <div className='flex justify-center'>
                                <button onClick={playAgain} className='bg-cyan-500 rounded text-white w-28 h-8 hover:bg-cyan-800'>Play Again</button> 
                            </div>
                            ) : (
                                <div className='grid grid-cols-9 justify-items-center'>
                                    {alphabetButtons()}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div> */}
        </>
    )
};

export default GamesPage;