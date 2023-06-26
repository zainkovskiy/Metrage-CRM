import React from 'react';
import styled from 'styled-components';

const BoxStyle = styled.div`
  display: flex;
  align-items: ${({ $ai }) => $ai ? $ai : 'center'};
  justify-content: ${({ $jc }) => $jc ? $jc : 'center'};
  gap: ${({ $gap }) => $gap ? $gap : '0.5rem'};
  ${({ $column }) => $column && 'flex-direction: column'};
  ${({ $fullWidth }) => $fullWidth && 'width: 100%'};
  ${({ $sp }) => $sp && { ...$sp }};
`
export const Box = ({ children, sp, ai, jc, column, gap, fullWidth }) => {
  return (
    <BoxStyle
      $sp={sp}
      $ai={ai}
      $jc={jc}
      $gap={gap}
      $column={column}
      $fullWidth={fullWidth}
    >
      {children}
    </BoxStyle>
  );
};
