"use client";

import { useState, useEffect } from "react";
import QuizManager from "../components/learningCourse/QuizManager";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [selectedCourseId, setSelectedCourseId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{ id: 1, title: "Introduce Yourself", level: 1 },
						{ id: 2, title: "Introduce Your Friends", level: 1 },
						{ id: 3, title: "Checkpoint Level 1", level: 1 },
						{ id: 4, title: "Describe Yourself and Others", level: 2 },
						{ id: 5, title: "Talk About Your Family", level: 2 },
						{ id: 6, title: "Checkpoint Level 2", level: 2 },
					]);
				}, 500);
			});
			setCourses(result);
		};

		fetchData();
	}, []);
	const handleCourseClick = (courseId) => {
		setSelectedCourseId(courseId);
	};

	return (
		<div className="container mx-auto my-8">
			{selectedCourseId == null ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{courses.map((course) => (
						<button
							key={course.id}
							onClick={() => handleCourseClick(course.id)}
							className="block p-4 border rounded hover:shadow-lg"
						>
							<h3>{course.title}</h3>
							<p>Level {course.level}</p>
						</button>
					))}
				</div>
			) : (
				<QuizManager selectedCourseId={selectedCourseId} />
			)}
		</div>
	);
};

export default CourseList;
