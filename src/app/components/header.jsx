import Link from "next/link";
import {
  UserButton,
  auth,
  SignedIn,
  SignInButton,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import GamesDropdown from "./games/snowman/games-dropdown";

const Header = () => {
  const { isLoaded, isSignedIn } = useAuth

  return (
    <>
      <nav className="px-6 flex items-center">
        <div className="flex items-center title">
          <Link href="/home-page">
            <div>LingoBuddy</div>
          </Link>
        </div>
        <div className="header-tab flex text-center">
          <Link
            href="/course-list"
            className="hover:text-gray-300 cursor-pointer"
          >
            Learning Courses
          </Link>
        </div>
        <div className="header-tab flex text-center">
          <Link href="/chatbot" className="hover:text-gray-300 cursor-pointer">
            ChatBot
          </Link>
        </div>
        <GamesDropdown />
        <div className="flex items-center">
          <SignedIn>
            <div className="ml-auto">
              <UserButton afterSignOutUrl="/home-page"/>
            </div>
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in' className="hover:text-white mr-4">
              Sign In
            </Link>
            <Link href='/sign-up' className="hover:text-white mr-4">
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </nav>
    </>
  );
}

export default Header;
