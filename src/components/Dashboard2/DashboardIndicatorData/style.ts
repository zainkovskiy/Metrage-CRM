import styled from 'styled-components';
import { ReactComponent as Indicator } from '../../../public/images/dashbord_indicators.svg';

export const DashboardIndicatorData = styled.div`
  display: flex;
  gap: 1rem;
  white-space: nowrap;
`;

export const DashboardIndicatorButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DashboardIndicatorBtn = styled(Indicator)`
  cursor: pointer;
  transition: transform 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(0.9);
    }
  }
`;
export const DashboardIndicators = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-auto-rows: min-content;
  gap: 0.5rem 1rem;
`;
