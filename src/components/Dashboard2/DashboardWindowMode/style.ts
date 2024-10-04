import styled from 'styled-components';

export const DashboardWindowMode = styled.div<{ $isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 30px 0;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  background-color: ${({ $isChecked }) => ($isChecked ? '#caebef' : '#fff')};
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #e4fcff;
    }
    &:active {
      background-color: #fff;
    }
  }
  @media (hover: none) {
    &:active {
      background-color: #e4fcff;
    }
  }
`;
export const DashboardWindowModeImg = styled.img`
  object-fit: contain;
  width: 45px;
  height: 45px;
`;
