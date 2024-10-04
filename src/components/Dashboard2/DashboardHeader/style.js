import styled from 'styled-components';

export const DashboardHeader = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 30px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: 'switch notice notice notice user';
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'switch user'
      'notice notice';
  }
`;
export const DashboardNotes = styled.div`
  grid-area: notice;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 1240px) {
    grid-template-columns: 1fr;
  }
`;
export const DashboardUser = styled.div`
  grid-area: user;
`;
