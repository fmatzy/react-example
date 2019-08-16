import * as React from 'react';
import styled from 'styled-components';
import { Square } from './Square';

const BoadRow = styled.div`
  &:after {
    clear: both;
    content: '';
    display: table;
  }
`;

interface BoardProps {
  squares: (string | null)[];
  highlights: number[] | null;
  onClick: (i: number) => void;
}

export function Board(props: BoardProps) {
  const renderSquare = (i: number) => {
    const highlight = props.highlights ? props.highlights.includes(i) : false;
    return (
      <Square
        key={i}
        value={props.squares[i]}
        highlight={highlight}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const renderRow = (row: number) => {
    const squares = Array.from(Array(3).keys()).map(i =>
      renderSquare(row * 3 + i)
    );
    return <BoadRow key={row}>{squares}</BoadRow>;
  };

  const rows = Array.from(Array(3).keys()).map(i => renderRow(i));
  return <div>{rows}</div>;
}
