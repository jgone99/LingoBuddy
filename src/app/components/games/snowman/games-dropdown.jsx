'use client'

import Link from "next/link";
import { useState } from "react";

const GamesDropdown = () => {
    const [visible, setVisible] = useState(false)

    const handleMouseEnter = () => {
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    return (
        <div className='games-tab header-tab' onMouseLeave={handleMouseLeave}>
            <div className="h-full content-center text-inherit hover:text-gray-300 cursor-pointer" onMouseEnter={handleMouseEnter}>
                Games
            </div>
            {visible && (
                <>
                    <div className="games-dropdown bg-inherit text-inherit">
                        <div className="bg-inherit">
                            <ul className="m-2">
                                <li>
                                    <Link href="/games/snowman">
                                        <div className="h-full hover:text-gray-300 cursor-pointer">
                                            Snowman
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/games/matching">
                                        <div className="h-full hover:text-gray-300 cursor-pointer">
                                            Matching
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