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
const SkeletonPhotoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`
const SkeletonPhotoItem = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
`
const SkeletonFooter = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
`

const SlideDialogPhotoSceleton = () => {
  return (
    <SkeletonPhotoContainer initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <SkeletonPhotoItem />
      <SkeletonFooter>
        <Box jc='flex-start'>
          <SkeletonCheckbox />
          <SkeletonLabel />
        </Box>
      </SkeletonFooter>
    </SkeletonPhotoContainer>
  )
};

export default SlideDialogPhotoSceleton;