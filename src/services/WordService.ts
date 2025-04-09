export async function loadWords(): Promise<string[]> {
    try {
        const jsonWords = await import('../assets/hangman_words.json').then((mod) => mod.default);

        let txtWords: string[] = [];
        try {
            const response = await fetch('../assets/hangman_words.txt');

            if (!response.ok) {
                throw new Error('TXT file not found');
            }

            const text = await response.text();
            txtWords = text
                .split('\n')
                .map((word) => word.trim().toUpperCase())
                .filter((word) => /^[A-Z]+$/.test(word));
        } catch (e) {
            console.error('Error loading TXT file:', e);
            txtWords = [];
        }

        const allWords = Array.from(new Set([...jsonWords.map((w) => w.toUpperCase()), ...txtWords]));

        const validWords = allWords.filter((word) => word.length >= 3 && word.length <= 20);

        if (validWords.length === 0) {
            throw new Error('No valid words loaded.');
        }

        return validWords;
    } catch (error) {
        console.error('Error loading word files:', error);
        throw new Error('Failed to load word files.');
    }
}
