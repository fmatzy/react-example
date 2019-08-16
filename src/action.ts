import { Action } from 'redux';

export enum GameActionType {
  MARK_SQUARE = 'MARK_SQUARE',
  JUMP_TO_STEP = 'JUMP_TO_STEP',
}

export interface MarkSquareAction extends Action {
  type: GameActionType.MARK_SQUARE;
  payload: number;
}

export interface JumpToStepAction extends Action {
  type: GameActionType.JUMP_TO_STEP;
  payload: number;
}

export type GameAction = MarkSquareAction | JumpToStepAction;

export interface IGameActionCreator {
  markSquareAction(squareId: number): MarkSquareAction;
  jumpToStepAction(stepNum: number): JumpToStepAction;
}

class GameActionCreator implements IGameActionCreator {
  markSquareAction(squareId: number): MarkSquareAction {
    return {
      type: GameActionType.MARK_SQUARE,
      payload: squareId,
    };
  }

  jumpToStepAction(stepNum: number): JumpToStepAction {
    return {
      type: GameActionType.JUMP_TO_STEP,
      payload: stepNum,
    };
  }
}

export const gameActionCreator: IGameActionCreator = new GameActionCreator();
