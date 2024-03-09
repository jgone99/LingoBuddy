'use client'

import Link from "next/link";
import { useState } from "react";

const GamesDropdown = () => {
    const [ visible, setVisible ] = useState(false)

    const handleMouseEnter = () => {
        setVisible(true);
      };
    
      const handleMouseLeave = () => {
        setVisible(false);
      };

    return (
        <div className='flex-1 bg-inherit text-center h-full' onMouseLeave={handleMouseLeave}>
            <button className="text-white h-full hover:text-gray-300 cursor-pointer" onMouseEnter={handleMouseEnter}>
                Games
            </button>
            {visible && (
                <>
                <div className="flex flex-col bg-inherit items-center">
                    <div className="games-dropdown absolute bg-inherit rounded-b">
                            <ul className="m-2">
                                <li>
                                    <Link href="/games/hangman">
                                        <div className="text-lg font-bold text-white">
                                            Hangman
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default GamesDropdown;