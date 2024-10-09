import styled from 'styled-components';
import logoUrl from '../../../public/images/logo_opacity.svg';

export const DashboardTableComponent = styled.div`
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
  background-position: 105% 120%;
`;
export const DashboardTable = styled.table`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  border-collapse: collapse;
  width: 100%;
`;
export const DashboardTableTh = styled.th`
  font-family: ${({ theme }) => theme.font.familyBold};
  padding: 0.5rem;
  box-sizing: border-box;
`;
export const DashboardTableThead = styled.thead`
  border-bottom: 1px solid #ccc;
`;
export const DashboardTableContainer = styled.div<{ $height?: number }>`
  height: ${({ $height }) => $height && `${$height}px`};
  min-height: 150px;
  flex-grow: 1;
  overflow: auto;
`;
