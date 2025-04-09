import { useEffect, useState } from 'react';
import { loadWords } from '../services/WordService';

export function useLoadWords() {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWords()
            .then((loadedWords) => {
                if (loadedWords.length === 0) {
                    setError('No words available.');
                } else {
                    setWords(loadedWords);
                }
            })
            .catch((e) => {
                console.error('Error loading words:', e);
                setError(e.message || 'Failed to load word files.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { words, loading, error };
}
