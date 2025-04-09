import { useState, useEffect } from 'react';
import {GameState} from "../types";

const LOCAL_STORAGE_KEY = 'hangmanGameState';

export function useHangmanGameState() {
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [wordLength, setWordLength] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Betöltés LocalStorage-ből
    useEffect(() => {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (savedState) {
            const { selectedWord, guessedLetters, wrongGuesses }: GameState = JSON.parse(savedState);

            setSelectedWord(selectedWord);
            setGuessedLetters(guessedLetters);
            setWrongGuesses(wrongGuesses);
            setWordLength(selectedWord.length);
        }

        setIsLoaded(true);
    }, []);

    // Mentés LocalStorage-be
    useEffect(() => {
        if (selectedWord) {
            const gameState: GameState = {
                selectedWord,
                guessedLetters,
                wrongGuesses,
                wordLength,
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
        }
    }, [selectedWord, guessedLetters, wrongGuesses, wordLength]);

    // LocalStorage törlés új játékhoz
    const resetGameState = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setSelectedWord('');
        setGuessedLetters([]);
        setWrongGuesses(0);
        setWordLength(0);
        setIsLoaded(false);
    };

    return {
        selectedWord,
        setSelectedWord,
        guessedLetters,
        setGuessedLetters,
        wrongGuesses,
        setWrongGuesses,
        wordLength,
        setWordLength,
        resetGameState,
        isLoaded
    };
}
