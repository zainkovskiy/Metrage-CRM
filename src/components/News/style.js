import { motion } from 'framer-motion';
import styled from 'styled-components';

export const News = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  @media (max-width: 768px) {
    width: 60vw;
  }
  @media (max-width: 480px) {
    width: 90vw;
    height: 60vh;
  }
`;
export const NewsContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
export const NewsContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: auto;
`;
export const NewsImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  float: left;
  margin-right: 0.5rem;
`;
export const NewsTitle = styled(motion.div)`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
