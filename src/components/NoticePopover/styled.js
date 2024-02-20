import styled from 'styled-components';
import { motion } from 'framer-motion';

export const NoticePopoverContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
  max-width: 300px;
  right: 0.5rem;
  top: 0.5rem;
`;
export const NoticeItem = styled(motion.div)`
  background: rgb(0 0 0 / 80%);
  padding: 1rem;
  border-radius: 5px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
`;
export const NoticeText = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #fff;
  font-size: 12px;
`;
