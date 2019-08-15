import * as React from 'react';
import styled from 'styled-components';
import { Board } from './Board';

export const GameArea = styled.div`
  display: flex;
  flex-direction: row;
`;

export const GameInfo = styled.div`
  margin-left: 20px;
`;

interface GameState {
  history: {
    squares: (string | null)[];
  }[];
  stepNumber: number;
  xIsNext: boolean;
}

export class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const { history: fullHistory, stepNumber, xIsNext } = this.state;

    const history = fullHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares }],
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;

    const current = history[stepNumber];
    const result = calculateWinner(current.squares);
    const status = result
      ? `Winner: ${result.winner}`
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const moves = history.map((_, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <GameArea>
        <div className="game-board">
          <Board
            squares={current.squares}
            highlights={result ? result.line : null}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <GameInfo>
          <div>{status}</div>
          <ol>{moves}</ol>
        </GameInfo>
      </GameArea>
    );
  }
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
