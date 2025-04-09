export interface GameState {
    selectedWord: string;
    guessedLetters: string[];
    wrongGuesses: number;
    wordLength: number;
}