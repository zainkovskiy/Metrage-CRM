import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DashboardTableLineTr = styled.tr`
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;
export const DashboardTableLineTd = styled.td`
  padding: 0.5rem;
  box-sizing: border-box;
  text-align: center;
  &:first-child {
    text-align: start;
  }
`;
export const DashboardTableLineWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
export const DashboardTableLineThWrap = styled.div`
  padding: 0 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
  height: 0;
`;
export const DashboardTableLineTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const Arrow = styled(motion.div)`
  display: inline-flex;
  & > svg {
    height: 12px;
    width: 12px;
  }
`;
