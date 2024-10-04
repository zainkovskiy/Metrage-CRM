import styled from 'styled-components';
import { ReactComponent as Swith } from '../../../public/images/change_switch.svg';
export const DashboardSwitch = styled.div`
  grid-area: switch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
`;
export const DashboardButton = styled(Swith)`
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
