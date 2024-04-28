import React from "react";
import { query } from "../db/queries";
import { mutate } from "../db/mutations";
import LevelCard from "../components/learning-course/level-card";
import { auth } from "@clerk/nextjs";
import CourseListComponent from "../components/learning-course/course-list-component";

const userProgressTableName = "course_progress";

export default async function CourseListPage() {
  const { userId } = auth();

  const fetchUserProgress = async () => {
    "use server";
    const res = await query("SELECT level_id, section_id FROM progress WHERE user_id=$1", [
      userId,
    ]);
    return res[0];
  };

  async function updateUserProgress(levelId, sectionId) {
    "use server";
    console.log("updating user");

    const ans = await fetchUserProgress()

    if(ans.level_id > levelId || (ans.level_id == levelId && ans.section_id >= sectionId)) {
      console.log('did not update. saved progression is ahead')
      return
    }

    const updateUserQuery = `UPDATE progress
			SET level_id = $2, section_id = $3
			WHERE user_id = $1`;
		try {
			await mutate(updateUserQuery, [userId, levelId, sectionId])
		} catch (error) {
			console.log('failed to update user', error)
		}
		
	}

  // FOR TESTING
  const resetUserProgress = async () => {
    "use server";
    await query(
      "UPDATE progress SET level_id = 1, section_id = 1 WHERE user_id = $1",
      [userId]
    );
  };

  const fetchAllQuestions = async () => {
    const res = await query(
      "SELECT * FROM all_questions ORDER BY level_id, section_id"
    );
    return res;
  };

  const userProgress = await fetchUserProgress();

  const allQuestions = await fetchAllQuestions();

  const questionsByLevelAndSection = allQuestions.reduce((groups, question) => {
    const key1 = question.level_id;
    const key2 = question.section_id;
    if (!groups[key1]) {
      groups[key1] = {
        1: [],
        2: [],
        3: [],
      };
    }
    groups[key1][key2].push(question);
    return groups;
  }, {});

  return (
    <>
      <CourseListComponent
        initUserProgress={userProgress}
        fetchUserProgress={fetchUserProgress}
        questionsByLevelAndSection={questionsByLevelAndSection}
        updateUserProgress={updateUserProgress}
        // FOR TESTING
        resetUserProgress={resetUserProgress}
      />
    </>
  );
}
