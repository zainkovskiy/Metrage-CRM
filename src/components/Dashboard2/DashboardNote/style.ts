import styled from 'styled-components';

export const DashboardNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;
export const DashboardNoteWrap = styled.div`
  display: flex;
  gap: 1rem;
`;
export const DashboardNoteList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const DashboardNoteText = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
