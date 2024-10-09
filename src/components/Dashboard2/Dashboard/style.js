import styled from 'styled-components';

export const Dashboard = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;
export const DashboardCharts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: min-content;
  }
`;
