export interface AlphabetButtonsProps {
    guessedLetters: string[];
    isGameWon: boolean;
    isGameLost: boolean;
    onLetterClick: (letter: string) => void;
}