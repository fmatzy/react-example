import produce from 'immer';
import { Reducer } from 'redux';
import { GameAction, GameActionType } from './action';
import { GameState } from './store';

const initGameState: GameState = {
  history: [
    {
      squares: Array(9).fill(null),
      lastMarked: null,
      nextPlayer: 'X',
      existsWinner: null,
    },
  ],
  players: ['X', 'O'],
  stepNumber: 0,
};

export const gameReducer: Reducer<GameState, GameAction> = (
  state = initGameState,
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case GameActionType.MARK_SQUARE:
        const { stepNumber, players } = draft;
        const { payload: squareId } = action;

        const current = draft.history[stepNumber];
        if (current.existsWinner || current.squares[squareId]) {
          return;
        }

        draft.history.length = stepNumber + 1;
        const lastMarked = current.nextPlayer;
        const newSquares = [...current.squares];
        newSquares[squareId] = lastMarked;
        const existsWinner = calculateWinner(newSquares);
        const nextPlayer = existsWinner
          ? null
          : draft.history.length === 9
          ? null
          : calculateNextPlayer(players, lastMarked);

        draft.history.push({
          squares: newSquares,
          lastMarked,
          nextPlayer,
          existsWinner,
        });
        draft.stepNumber = stepNumber + 1;
        return;

      case GameActionType.JUMP_TO_STEP:
        let { payload: stepNum } = action;
        if (stepNum < 0) {
          stepNum = 0;
        }
        if (stepNum > draft.history.length - 1) {
          stepNum = draft.history.length - 1;
        }
        draft.stepNumber = stepNum;
        return;
    }
  });

function calculateNextPlayer(players: string[], lastMarked: string | null) {
  const step = players.findIndex(player => player === lastMarked);
  return players[(step + 1) % players.length];
}

function calculateWinner(
  squares: (string | null)[]
): { winner: string; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return lines.reduce<{ winner: string; line: number[] } | null>(
    (obj, line) => {
      if (obj) {
        return obj;
      }

      const [a, b, c] = line;
      const winner = squares[a];
      if (winner && winner === squares[b] && winner === squares[c]) {
        return {
          winner,
          line,
        };
      }
      return null;
    },
    null
  );
}
