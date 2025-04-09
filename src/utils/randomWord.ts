export function getRandomWord(words: string[]): string {
    if (!words.length) {
        throw new Error('Word list is empty');
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}
