

const LevelCardContainer = () => {
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
            </div>
        </>
    )
}