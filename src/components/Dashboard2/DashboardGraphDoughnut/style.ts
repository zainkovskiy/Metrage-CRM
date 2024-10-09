import styled from 'styled-components';
import logoUrl from '../../../public/images/logo_opacity.svg';

export const DashboardGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 30px 0;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.primary};
  box-shadow: 0px 0px 6px 4px rgba(145, 36, 197, 0.2);
  background-image: url(${logoUrl});
  background-repeat: no-repeat;
  background-position: -5% -20%;
`;
export const DashboardGraphContainer = styled.div`
  flex-grow: 1;
`;
