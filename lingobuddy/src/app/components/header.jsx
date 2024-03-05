import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";

const Header = () => {
  const { userId } = auth();

  return (
    <>
      <nav className="bg-blue-700 py-4 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-lg font-bold text-white">LingoBuddy</div>
          </Link>
        </div>
        <div className="flex-1 text-center">
          <Link
            href="learningCourses"
            className="text-white mx-2 hover:text-gray-300 cursor-pointer"
          >
            Learning Courses
          </Link>
        </div>
        <div className="text-white flex items-center">
          {!userId && (
            <>
              <Link
                href="sign-in"
                className="text-gray-300 hover:text-white mr-4"
              >
                Sign In
              </Link>
              <Link
                href="sign-up"
                className="text-gray-300 hover:text-white mr-4"
              >
                Sign Up
              </Link>
            </>
          )}
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
