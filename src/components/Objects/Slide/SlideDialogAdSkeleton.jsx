import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Box } from 'ui/Box';

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`
const SkeletonCheckbox = styled.div`
  width: 18px;
  height: 18px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`
const SkeletonLabel = styled.div`
  width: 40px;
  height: 16px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`
const SkeletonInput = styled.div`
  width: 133px;
  height: 30.38px;
  border-radius: 5px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`
const SkeletonContainer = styled(motion.div)`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  heigth: 200px;
`

const SlideDialogAdSkeleton = () => {
  return (
    <SkeletonContainer initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Box jc='space-between'>
        <Box>
          <SkeletonCheckbox/>
          <SkeletonLabel/>
        </Box>
          <SkeletonInput/>
      </Box>
      <Box jc='space-between'>
        <Box>
          <SkeletonCheckbox/>
          <SkeletonLabel/>
        </Box>
          <SkeletonInput/>
      </Box>
      <Box jc='space-between'>
        <Box>
          <SkeletonCheckbox/>
          <SkeletonLabel/>
        </Box>
          <SkeletonInput/>
      </Box>
      <Box jc='space-between'>
        <Box>
          <SkeletonCheckbox/>
          <SkeletonLabel/>
        </Box>
          <SkeletonInput/>
      </Box>
      <Box jc='space-between'>
        <Box>
          <SkeletonCheckbox/>
          <SkeletonLabel/>
        </Box>
          <SkeletonInput/>
      </Box>
    </SkeletonContainer>
  )
};

export default SlideDialogAdSkeleton;