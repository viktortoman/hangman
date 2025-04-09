import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import Loader from "../components/Loader.tsx";
import WordLengthButton from "../components/WordLengthButton.tsx";
import {useLoadWords} from "../hooks/useLoadWords.ts";

export default function LandingPage() {
    const [selectedLength, setSelectedLength] = useState<number | null>(null);
    const {words, loading, error} = useLoadWords();
    const [hasSavedGame, setHasSavedGame] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        const savedState = localStorage.getItem('hangmanGameState');
        setHasSavedGame(!!savedState);
    }, [error]);

    const wordLengths = Array.from(new Set(words.map((w) => w.length))).sort((a, b) => a - b);

    const handleContinue = () => {
        navigate('/game');
    };

    const handleLengthClick = (length: number) => {
        setSelectedLength(length);
    };

    const handleRandomClick = () => {
        const randomLength = wordLengths[Math.floor(Math.random() * wordLengths.length)];
        setSelectedLength(randomLength);
    };

    const handlePlayClick = () => {
        if (selectedLength) {
            navigate('/game', {state: {wordLength: selectedLength, words}});
        } else {
            toast.error('Please select a word length!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
                <div className="bg-white rounded-lg shadow-lg px-24 py-12 w-full max-w-xl text-center">
                    <h1 className="text-4xl font-bold mb-8">The Hangman</h1>
                    <Loader/>
                </div>
            </div>
        );
    }

    if (error) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
            <div className="bg-white rounded-lg shadow-lg px-24 py-12 w-full max-w-xl text-center">
                <h1 className="text-4xl font-bold mb-4">The Hangman</h1>

                {hasSavedGame ? (
                    <>
                        <button
                            onClick={handleContinue}
                            className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800 transition-all text-xl font-bold mt-6"
                        >
                            CONTINUE GAME
                        </button>
                    </>
                ) : (
                    <>
                        <p className="my-12">
                            Let’s play <strong>Hangman</strong>!<br/>
                            How many letters do you want in your word?
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-4 px-14">
                            {wordLengths.map((length, index) => {
                                const itemsInLastRow = wordLengths.length % 3 || 3;
                                const isOnlyOneInLastRow = itemsInLastRow === 1 && index === wordLengths.length - 1;

                                return (
                                    <WordLengthButton
                                        key={length}
                                        length={length}
                                        selected={selectedLength === length}
                                        onClick={() => handleLengthClick(length)}
                                        fullWidth={isOnlyOneInLastRow}
                                    />
                                );
                            })}
                        </div>

                        <div className="px-14 py-6">
                            <button
                                onClick={handleRandomClick}
                                className="w-full p-3 mb-6 border rounded bg-white text-2xl font-bold shadow-md"
                            >
                                Random
                            </button>

                            <button
                                onClick={handlePlayClick}
                                className="bg-black text-white py-2 rounded hover:bg-gray-800 w-full mt-12"
                            >
                                LET'S PLAY!
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
