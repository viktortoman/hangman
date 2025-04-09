import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {GameLayoutProps} from "../types";

export default function GameLayout({children}: GameLayoutProps) {
    const location = useLocation();
    const isInstructionsPage = location.pathname === '/instructions';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex p-8 relative">
                <div className="absolute top-4 right-6 text-sm text-black">
                    {isInstructionsPage ? null : (
                        <Link to="/instructions" className="flex items-center gap-1 hover:underline">
                            INSTRUCTIONS <FontAwesomeIcon icon={faArrowRight} className="text-sm"/>
                        </Link>
                    )}
                </div>

                {children}
            </div>
        </div>
    );

}
