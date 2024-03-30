import Link from "next/link";
import {
  UserButton,
  auth,
  SignedIn,
  SignInButton,
  SignedOut,
} from "@clerk/nextjs";
import GamesDropdown from "./snowman/games-dropdown";

const Header = () => {
<<<<<<< HEAD
  const { userId } = auth();
  console.log(userId);
  return (
    <>
      <nav className="bg-blue-700 h-16 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href={(!userId && "/") || (userId && "/home-page")}>
            <div className="text-lg font-bold text-white">LingoBuddy</div>
          </Link>
        </div>
        <div className="flex-1 text-center">
          <Link
            href="/course-list"
            className="text-white mx-2 hover:text-gray-300 cursor-pointer"
          >
            Learning Courses
          </Link>
        </div>
        <GamesDropdown />
        <div className="text-white flex items-center">
          <SignedIn>
            <div className="ml-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
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
          </SignedOut>
        </div>
      </nav>
    </>
  );
=======

	return (
		<>
			<nav className="h-16 px-6 flex items-center justify-between relative">
				<div className="flex items-center title">
					<Link href="/home-page">
						<div>
							LingoBuddy
						</div>
					</Link>
				</div>
				<div className="flex-1 text-center">
					<Link
						href="/course-list"
						className="mx-2 hover:text-gray-300 cursor-pointer"
					>
						Learning Courses
					</Link>
				</div>
				<div className="flex-1 text-center">
					<Link
						href="/chatbot"
						className="mx-2 hover:text-gray-300 cursor-pointer"
					>
						ChatBot
					</Link>
				</div>
				<GamesDropdown />
				<div className="flex items-center">
					<SignedIn>
						<div className="ml-auto">
							<UserButton afterSignOutUrl='/home-page' />
						</div>
					</SignedIn>
					<SignedOut>
						<Link href='sign-in' className='hover:text-white mr-4'>
							Sign In
						</Link>
						<Link href='sign-up' className='hover:text-white mr-4'>
							Sign Up
						</Link>
					</SignedOut>
				</div>
			</nav>
		</>
	)
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
};

export default Header;
