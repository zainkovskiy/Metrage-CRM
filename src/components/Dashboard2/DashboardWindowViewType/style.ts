import styled from 'styled-components';

export const DashboardWindowViewType = styled.div<{ $isChecked: boolean }>`
  padding: 0.5rem;
  box-sizing: border-box;
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
export const DashboardWindowViewTypeText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
