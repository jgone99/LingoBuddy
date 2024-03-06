import Link from 'next/link'
import { UserButton, auth } from '@clerk/nextjs';

const Header = () => {
    const { userId } = auth();

    return (
        <>
            <nav className="bg-blue-700 py-4 px-6 flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <Link href={(!userId && "/") || (userId && "/home-page")}>
                        <div className="text-lg font-bold text-white">
                            LingoBuddy
                        </div>
                    </Link>
                </div>
                <div className='flex items-center'>
                    <Link href="/games">
                        <div className="text-lg font-bold text-white">
                            Games
                        </div>
                    </Link>
                </div>
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