import Link from 'next/link'
import { UserButton, auth } from '@clerk/nextjs';
import GamesDropdown from './games-dropdown';

const Header = () => {
  const { userId } = auth();

    return (
        <>
            <nav className="bg-blue-700 h-16 px-6 flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <Link href={(!userId && "/") || (userId && "/home-page")}>
                        <div className="text-lg font-bold text-white">
                            LingoBuddy
                        </div>
                    </Link>
                </div>
                <div className='flex-1 items-center'>
                  {userId && (
                      <>
                          <Link href="/games">
                              <div className="text-white mx-2 hover:text-gray-300 cursor-pointer">
                                  Games
                              </div>
                          </Link>
                      </>
                  )}
                </div>
                <GamesDropdown />
                <div className="text-white flex items-center">
                    {!userId && (
                        <>
                            <Link href='sign-in' className='text-gray-300 hover:text-white mr-4'>
                                Sign In
                            </Link>
                            <Link href='sign-up' className='text-gray-300 hover:text-white mr-4'>
                                Sign Up
                            </Link>
                        </>
                    )}
                    <div className="ml-auto">
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Header;
