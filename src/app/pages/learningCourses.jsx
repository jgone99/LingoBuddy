import Link from "next/link";
import { auth } from "@clerk/nextjs";

export async function getServerSideProps(context) {
  const courses = [
    //Static data
    { id: 1, title: "Introduce Yourself", level: 1 },
    { id: 2, title: "Introduce Your Friends", level: 1 },
  ];

  return {
    props: {
      courses,
    },
  };
}

const CourseList = ({ courses }) => {
  //const { userId } = auth();

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link ref={`/courses/${course.id}`} key={course.id}>
            <a className="block p-4 border rounded hover:shadow-lg">
              <h3>{course.title}</h3>
              <p>Level {course.level}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
