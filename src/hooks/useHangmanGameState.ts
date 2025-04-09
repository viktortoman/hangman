import {useState, useEffect} from 'react';
import {localStorageService} from '../services/LocalStorageService';

export function useHangmanGameState() {
    const [selectedWord, setSelectedWord] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [wordLength, setWordLength] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Betöltés LocalStorage-ből
    useEffect(() => {
        const savedState = localStorageService.loadGameState();

        if (savedState) {
            const { selectedWord, guessedLetters, wrongGuesses } = savedState;

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
            localStorageService.saveGameState({
                selectedWord,
                guessedLetters,
                wrongGuesses,
                wordLength,
            });
        }
    }, [selectedWord, guessedLetters, wrongGuesses, wordLength]);

    // LocalStorage törlés új játékhoz
    const resetGameState = () => {
        localStorageService.clearGameState();
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
