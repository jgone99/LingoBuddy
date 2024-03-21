
import MatchingGame from '../../components/matching/matching-game'
import { query } from '../../db/queries'

const MatchingPage = async() => {
    const matchCount = 5

    const queryWords = async() => {
        const ans = (await query(`SELECT * FROM word_pairs ORDER BY RANDOM() LIMIT ${matchCount}`)).map((match) => [match['english'], match['spanish']])
        //console.log(ans)
        return ans;
    }

    const data = await queryWords()

    return (
        <>
            <MatchingGame matches={data}/>
        </>
    )
}

export default MatchingPage