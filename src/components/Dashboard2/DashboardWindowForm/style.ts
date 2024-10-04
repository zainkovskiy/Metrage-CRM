import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DashboardWindowForm = styled(motion.form)`
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 30px 0;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 320px;
`;
export const DashboardWindowFormFileds = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const DashboardWindowMods = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;
export const DashboardWindowList = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow: auto;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.primary};
  border-radius: 5px;
`;
export const DashboardWindowFormButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
