import * as React from 'react';
import { Provider } from 'react-redux';
import { GameContainer } from './Game';
import { gameStore } from './store';

export class App extends React.Component {
  public render() {
    return (
      <Provider store={gameStore}>
        <GameContainer />
      </Provider>
    );
  }
}
