<<<<<<< HEAD


const CourseListComponent = () => {
    return (
        <>
            <div>
                {levels.map((level, index) => (
                    <React.Fragment key={index}>
                    {Object.entries(groupedQuestions[index]).map(
                        ([section, questions], sectionIndex) => (
                        <LevelCard
                            key={sectionIndex}
                            levelId={level}
                            sectionId={questions[0].sectionId}
                            title={section}
                            questions={questions}
                            score={scores[index]}
                            userId={userId}
                            updateUserProgress={updateUserProgress}
                            passed={passedStatuses[index]}
                            isLastSection={
                            sectionIndex ===
                            Object.entries(groupedQuestions[index]).length - 1
                            }
                            hasPassedSectionTwo={passedStatuses[index]}
                        />
                        )
                    )}

                    <LevelCard
                        key={index + 10}
                        levelId={level}
                        title={`Checkpoint Level ${level}`}
                        questions={checkpointQuestions[index]}
                        hasPassedSectionTwo={passedStatuses[index]} // assuming that section 2 is at index 1
                        isCheckpoint={true}
                    />
                    </React.Fragment>
                ))}
=======
'use client'

import { useState, useTransition } from 'react'
import LevelCard from './level-card'

import { useAuth } from '@clerk/nextjs'

var loading = false

const CourseListComponent = ({ 
    initUserProgress, 
    fetchUserProgress, 
    questionsByLevelAndSection, 
    updateUserProgress,

    // FOR TESTING
    resetUserProgress
}) => {
    const [ userProgress, setUserProgress ] = useState(initUserProgress)
    const [ isPending, startTransistion ] = useTransition()

    const unlockNextSection = (levelId, sectionId) => {
        loading = true
        startTransistion(() => {
            fetchUserProgress().then(result => {
                setUserProgress(result)
                loading = false
            })
        })
    }

    const resetUser = () => {
        if(resetUserProgress) {
            resetUserProgress()
        }
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
                        isPending={isPending}
                        />
                    </>
                )
            })
        })

        return levelCards
    }

    return (
        <>
            {/* FOR TESTING */}
            <div>
                <button onClick={resetUser}>RESET USER (TESTING)</button>
            </div>

            <div>
                {console.log(isPending)}
                {makelevelCards()}
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
            </div>
        </>
    )
}

export default CourseListComponent;