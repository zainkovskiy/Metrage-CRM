import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PanelControlStyle = styled(motion.aside)`
  grpath-area: panel;
  background-color: ${({ theme }) => theme.color.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0.5rem;
  left: 0;
  bottom: 0.5rem;
  width: 56px;
  overflow: hidden;
  z-index: 99;
  gap: 1rem;
  opacity: 0.7;
  border-radius: 5px;
  @media print {
    display: none;
  }
`;
