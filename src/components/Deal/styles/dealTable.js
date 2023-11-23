import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as Arrow } from 'images/arrow-down.svg';

export const DealTableContainer = styled.div`
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
export const TableThStyle = styled.th`
  padding: 0.3rem;
  ${({ $isButton }) => $isButton && 'cursor: pointer;'}
  ${({ $match }) => $match && 'background: #84019e4d;'}
  transition: background .3s;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }
  &: hover > div >svg {
    opacity: 1;
  }
`;

export const ArrowStyle = styled(Arrow)`
  ${({ $isUp }) => $isUp && 'transform: rotate(-180deg);'}
  ${({ $isSelect }) => ($isSelect ? 'opacity: 1;' : 'opacity: 0;')}
  width: 10px;
  height: 10px;
  pointer-events: none;
  transition: opacity 0.3s, transform .3s;
s`;
