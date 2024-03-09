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
        <div className='justify-self-stretch h-full' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="text-lg font-bold h-full text-white">
                Games
            </button>
            {visible && (
                <>
                    <div className="games-dropdown absolute bg-blue-700">
                        <ul className="m-2">
                            <li>
                                <Link href="/games/hangman">
                                    <div className="text-lg font-bold text-white">
                                        Hangman
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/games/hangman">
                                    <div className="text-lg font-bold text-white">
                                        Hangman
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/games/hangman">
                                    <div className="text-lg font-bold text-white">
                                        Hangman
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default GamesDropdown;