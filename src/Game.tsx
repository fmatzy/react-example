import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styled from 'styled-components';
import { gameActionCreator } from './action';
import { Board } from './Board';
import { GameState } from './store';

export const GameArea = styled.div`
  display: flex;
  flex-direction: row;
`;

export const GameInfo = styled.div`
  margin-left: 20px;
`;

interface StateToProps {
  history: {
    squares: (string | null)[];
    lastMarked: string | null;
    nextPlayer: string | null;
    existsWinner: { line: number[] } | null;
  }[];
  players: string[];
  stepNumber: number;
}

interface DispatchToProps {
  markSquare: (squareId: number) => void;
  jumpToStep: (stepNum: number) => void;
}

type GameProps = StateToProps & DispatchToProps;

function Game(props: GameProps) {
  const { history, stepNumber, markSquare, jumpToStep } = props;

  const current = history[stepNumber];
  const status = current.existsWinner
    ? `Winner: ${current.lastMarked}`
    : current.nextPlayer
    ? `Next player: ${current.nextPlayer}`
    : 'No winner';

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpToStep(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <GameArea>
      <div className="game-board">
        <Board
          squares={current.squares}
          highlights={current.existsWinner ? current.existsWinner.line : null}
          onClick={i => markSquare(i)}
        />
      </div>
      <GameInfo>
        <div>{status}</div>
        <ol>{moves}</ol>
      </GameInfo>
    </GameArea>
  );
}

const mapStateToProps = (state: GameState): StateToProps => ({
  ...state,
});

const mapDispatchToProps = (
  dispatch: React.Dispatch<Action>
): DispatchToProps => ({
  markSquare: (squareId: number) => {
    dispatch(gameActionCreator.markSquareAction(squareId));
  },

  jumpToStep: (stepNum: number) => {
    dispatch(gameActionCreator.jumpToStepAction(stepNum));
  },
});

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
