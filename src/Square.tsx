import * as React from 'react';
import styled, { css } from 'styled-components';

interface SquareButtonProp {
  highlight: boolean;
}

const SquareButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  ${(props: SquareButtonProp) =>
    props.highlight
      ? css`
          color: red;
        `
      : null}

  &:focus {
    outline: none;
  }
`;

interface SquareProps {
  value: string | null;
  highlight: boolean;
  onClick: () => void;
}

export function Square(props: SquareProps) {
  return (
    <SquareButton highlight={props.highlight} onClick={props.onClick}>
      {props.value}
    </SquareButton>
  );
}
