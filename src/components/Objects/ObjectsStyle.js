import styled from "styled-components";
import { motion } from "framer-motion";

export const ObjectSliderBox = styled(motion.div)`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  ${({ $column }) => $column && 'flex-direction: column;'}
`