'use client'

import { useState } from 'react'
import LevelCard from './level-card'

import { useAuth } from '@clerk/nextjs'

var loading = false

const CourseListComponent = ({ initUserProgress, fetchUserProgress, questionsByLevelAndSection, updateUserProgress }) => {
    const [ userProgress, setUserProgress ] = useState(initUserProgress)

    const { userId } = useAuth()

    const unlockNextSection = (levelId, sectionId) => {
        loading = true
        fetchUserProgress().then(result => {
            setUserProgress(result)
            loading = false
        })
    }

    const makelevelCards = () => {
        const currentLevel = userProgress.level_id
        const currentSection = userProgress.section_id
        var levelCards = []
        //console.log(Object.entries(questionsByLevelAndSection))
        Object.entries(questionsByLevelAndSection).forEach((questionsByLevel) => {
            const level = Number.parseInt(questionsByLevel[0])

            Object.entries(questionsByLevel[1]).forEach((bySection, index) => {
                const section = Number.parseInt(bySection[0])
                const question = bySection[1]
                levelCards.push(
                    <>
                        <LevelCard
                        key={'level-cars-'+index}
                        levelId={level}
                        sectionId={section}
                        title={bySection[1][0]['section_text']}
                        questions={bySection[1]}
                        //score={scores[index]}
                        //userId={userId}
                        updateUserProgress={updateUserProgress}
                        isDisabled={(currentLevel < level) || (currentLevel == level && currentSection < section)}
                        unlockNextSection={unlockNextSection}
                        />
                    </>
                )
            })
        })

        return levelCards
    }

    return (
        <>
            <div>
                {makelevelCards()}
            </div>
        </>
    )
}

export default CourseListComponent;