import { GameState } from '../types';

const STORAGE_KEY = 'hangmanGameState';

export const localStorageService = {
    saveGameState: (state: GameState) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    loadGameState: (): GameState | null => {
        const savedState = localStorage.getItem(STORAGE_KEY);

        if (!savedState) {
            return null;
        }

        try {
            return JSON.parse(savedState) as GameState;
        } catch (error) {
            console.error('Failed to parse game state from LocalStorage', error);
            return null;
        }
    },

    clearGameState: () => {
        localStorage.removeItem(STORAGE_KEY);
    },
};
