import GameLayout from '../components/GameLayout';
import {Link} from "react-router-dom";
import HangmanDrawing from "../components/HangmanDrawing.tsx";

export default function InstructionsPage() {
    return (
        <GameLayout>
            <div className="flex flex-col items-center justify-center w-full text-center space-y-8">
                <h1 className="text-4xl font-bold">The Hangman</h1>
                <HangmanDrawing />

                <h2 className="text-3xl font-bold">Game instructions</h2>

                <div className="space-y-8 text-gray-900 px-48">
                    <p className="mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget arcu eros. Phasellus consectetur mi id est ultrices elementum.
                    </p>
                    <p className="pb-8">
                        Ut interdum scelerisque tortor. Nunc lacinia ante orci, vel facilisis magna hendrerit in.
                    </p>
                </div>

                <Link
                    to="/"
                    className="bg-black text-white py-2 px-12 rounded hover:bg-gray-800 transition-all"
                >
                    GOT IT!
                </Link>
            </div>
        </GameLayout>
    );
}
