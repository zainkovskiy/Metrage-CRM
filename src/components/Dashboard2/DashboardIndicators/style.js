import styled from 'styled-components';
export const DashboardIndicators = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 1240px) {
    grid-template-columns: max-content 1fr 0.5fr;
  }
  @media (max-width: 1024px) {
    grid-template-columns: max-content 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const LogoWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
`;
