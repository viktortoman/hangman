import {GamePageState} from "./GamePageState.ts";

export interface UseWordLoaderProps {
    isLoaded: boolean;
    word: string;
    state: GamePageState;
    setWord: (word: string) => void;
    setWordLength: (length: number) => void;
}