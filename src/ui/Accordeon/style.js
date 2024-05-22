import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Accordeon = styled.div``;
export const AccordeonHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 12px;
    height: 12px;
  }
`;
export const AccordeonContent = styled(motion.div)`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(207px, 1fr));
  gap: 0.5rem;
`;
