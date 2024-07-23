import styled, { css } from 'styled-components';

export const BillBlock = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 40px 0;
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
export const BillBlockContainer = styled.div`
  min-height: 300px;
  max-height: 300px;
  flex-grow: 1;
  ${({ $isOverflow }) =>
    $isOverflow &&
    css`
      overflow: auto;
    `}
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #786464;
`;
export const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
export const TableHader = styled.thead`
  position: sticky;
  top: 0;
`;
export const TableHead = styled.tr`
  background-color: #ccc;
  & > th {
    font-family: ${({ theme }) => theme.font.familyBold};
    padding: 0.3rem;
  }
`;
export const TableLine = styled.tr`
  background-color: ${({ idx }) => idx % 2 === 1 && '#e6e6e6'};
  cursor: pointer;
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: rgb(240, 219, 245);
    }
    &:active {
      background-color: rgb(255, 255, 255);
    }
  }
  @media (hover: none) {
    &:active {
      background-color: rgb(240, 219, 245);
    }
  }
  & > td {
    padding: 0.3rem;
  }
`;
