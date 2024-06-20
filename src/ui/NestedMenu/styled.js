import styled from 'styled-components';

export const NestedMenu = styled.ul`
  z-index: 9999;
  padding: 0.2rem 0;
  border-radius: 5px;
  background-color: rgb(244 244 244);
  border: 1px solid #84019e;
`;
export const NestedMenuItem = styled.li`
  list-style: none;
  padding: 0.2rem;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  @media (hover: hover) {
    &:hover {
      background-color: #ecc1f4;
    }
    &:active {
      background-color: #fff;
    }
  }
`;
