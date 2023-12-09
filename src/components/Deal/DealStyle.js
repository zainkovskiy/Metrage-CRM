import styled from 'styled-components';
import { device } from 'styles/device';
import { motion } from 'framer-motion';

// export const ObjectSliderBox = styled(motion.div)`
//   background-color: #fff;
//   border-radius: 5px;
//   padding: 0.5rem;
//   display: flex;
//   gap: 0.5rem;
//   ${({ $column }) => $column && 'flex-direction: column;'}
// `
export const SlideGridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ $minWidth }) =>
    `repeat(auto-fit, minmax(${$minWidth + 'px' || '200px'}, 1fr))`};
  gap: 0.5rem;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'};
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
export const SlideBlockStyle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  gap: ${({ gap }) => gap || '0.5rem;'};
  justify-content: ${({ jc }) => jc || 'center'};
  align-items: ${({ ai }) => ai || 'center'};
  ${({ $column }) => $column && 'flex-direction: column'};
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap'};
`;
