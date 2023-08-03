import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`
const SkeletonStoryItemStyle = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
`
const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.3rem;
`
const SkeletonAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`
const SkeletonTitle = styled.div`
  height: ${({ $h }) => $h + 'px'};
  width: ${({ $w }) => $w + 'px'};
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`
const SlideStoryItemSkeleton = () => {
  return (
    <SkeletonStoryItemStyle initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <SkeletonAvatar />
      <SkeletonContainer>
        <SkeletonTitle $h={18} />
        <SkeletonTitle $h={11} $w={72} />
        <SkeletonTitle $h={15} />
      </SkeletonContainer>
    </SkeletonStoryItemStyle>
  );
};

export default SlideStoryItemSkeleton;