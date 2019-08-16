import { createStore } from 'redux';
import { gameReducer } from './reducer';

export interface GameState {
  history: {
    squares: (string | null)[];
    lastMarked: string | null;
    nextPlayer: string | null;
    existsWinner: { line: number[] } | null;
  }[];
  players: string[];
  stepNumber: number;
}

export const gameStore = createStore(gameReducer);
