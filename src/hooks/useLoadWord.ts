import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRandomWord } from '../utils/randomWord';
import {UseWordLoaderProps} from "../types";

export function useWordLoader({ isLoaded, word, state, setWord, setWordLength }: UseWordLoaderProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return;

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
    }, [isLoaded, word, state, setWord, setWordLength, navigate]);
}
