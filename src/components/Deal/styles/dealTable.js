import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DealTableStyle = styled.div`
  height: 100%;
  overflow: auto;
`;
export const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  position: relative;
`;
export const TableHeader = styled.thead`
  font-family: ${({ theme }) => theme.font.familyBold};
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  & > tr > th {
    padding: 0.3rem;
  }
`;
export const TableLine = styled(motion.tr)`
  cursor: pointer;
  transition: background 0.3s;
  &: hover {
    background: #e6b2f0;
  }
  & > td {
    padding: 0.3rem;
  }
`;
