import Link from 'next/link'
import { UserButton, auth, SignedIn, SignInButton, SignedOut } from '@clerk/nextjs';
import GamesDropdown from './games/snowman/games-dropdown';

const Header = () => {

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
};

export default Header;
