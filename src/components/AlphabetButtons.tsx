import {AlphabetButtonsProps} from "../types";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabetButtons({
    guessedLetters,
    isGameWon,
    isGameLost,
    onLetterClick,
}: AlphabetButtonsProps) {
    return (
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mb-6 px-4 md:px-8">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    disabled={guessedLetters.includes(letter) || isGameWon || isGameLost}
                    className={`border rounded p-2 text-lg font-bold shadow-md ${
                        guessedLetters.includes(letter) ? 'text-gray-200' : 'bg-white'
                    }`}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
