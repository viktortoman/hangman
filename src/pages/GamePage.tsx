import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import GameLayout from '../components/GameLayout';
import {toast} from "react-toastify";
import {GamePageState} from '../types';
import HangmanDrawing from "../components/HangmanDrawing";
import {useHangmanGameState} from '../hooks/useHangmanGameState';
import {getRandomWord} from "../utils/randomWord.ts";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as GamePageState;

    const {
        selectedWord: word,
        setSelectedWord: setWord,
        guessedLetters,
        setGuessedLetters,
        wrongGuesses,
        setWrongGuesses,
        wordLength,
        setWordLength,
        resetGameState,
        isLoaded
    } = useHangmanGameState();

    useEffect(() => {
        if (!isLoaded) return;

        // Ha már van szó, akkor nem választunk újat (frissítés után)
        if (word) return;

        if (!state || !state.wordLength) {
            navigate('/');
            return;
        }

        const filteredWords = state.words.filter((w) => w.length === state.wordLength);

        if (filteredWords.length === 0) {
            toast.error('No words with that length!');
            navigate('/');
            return;
        }

        const randomWord = getRandomWord(filteredWords);

        setWord(randomWord.toUpperCase());
        setWordLength(randomWord.length);
    }, [state, navigate, word, setWord, wordLength, setWordLength, isLoaded]);

    const handleLetterClick = (letter: string) => {
        if (guessedLetters.includes(letter)) return;

        setGuessedLetters((prev) => [...prev, letter]);

        if (!word.includes(letter)) {
            setWrongGuesses((prev) => prev + 1);
        }
    };

    const handleEndGame = () => {
        navigate('/');
    };

    const handleStartNewGame = () => {
        resetGameState();
        navigate('/');
    };

    const maxWrongGuesses = 10;
    const isGameWon = word && word.split('').every((letter) => guessedLetters.includes(letter));
    const isGameLost = wrongGuesses >= maxWrongGuesses;

    return (
        <GameLayout>
            <div className="flex flex-col md:flex-row w-full items-center justify-center">
                <div className="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
                    <HangmanDrawing wrongGuesses={wrongGuesses} />
                </div>

                <div className="w-full md:w-2/3 text-center md:text-left pt-5">
                    <h1 className="text-4xl font-bold mb-12 px-4 md:pl-8">The Hangman</h1>

                    <p className="mb-4 px-4 md:pl-8">
                        {isGameWon && <span className="text-green-500 font-bold text-lg">You’ve won!</span>}
                        {isGameLost && <span className="text-red-500 font-bold text-lg">You’ve lost</span>}
                        {!isGameWon && !isGameLost && `It’s a ${wordLength} letter word`}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6 px-4 md:pl-8">
                        {word?.split('').map((letter, idx) => (
                            <div
                                key={idx}
                                className="w-10 h-10 md:w-12 md:h-12 border border-black border-2 text-2xl flex items-center justify-center"
                            >
                                {guessedLetters.includes(letter) || isGameLost ? letter : ''}
                            </div>
                        ))}
                    </div>

                    <p className="text-sm mb-4 px-4 md:pl-8">Play with a word</p>

                    <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mb-6 px-4 md:px-8">
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                disabled={guessedLetters.includes(letter) || isGameWon || isGameLost}
                                className={`border rounded p-2 text-lg font-bold shadow-md ${
                                    guessedLetters.includes(letter) ? 'text-gray-200' : 'bg-white'
                                }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    {/* End Game / Start New Game gombok */}
                    <div className="flex flex-col md:flex-row gap-4 px-4 md:pl-8">
                        <button
                            onClick={handleEndGame}
                            className="border rounded px-6 py-2 bg-white shadow-md uppercase hover:bg-gray-100"
                        >
                            End Game
                        </button>
                        <button
                            onClick={handleStartNewGame}
                            className="border rounded px-6 py-2 bg-black text-white shadow-md uppercase hover:bg-gray-800"
                        >
                            Start New Game
                        </button>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}
