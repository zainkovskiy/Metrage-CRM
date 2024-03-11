import React, { useState } from 'react';
import styled from 'styled-components';
import DialogWindow from 'components/Main/DialogWindow';
import { TextSpanStyle } from 'styles/styles';

const Reward = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;
const RewardImg = styled.img`
  height: 48px;
  cursor: pointer;
`;
const RewardFullWidth = styled.img`
  max-width: 80vw;
  height: 80vh;
  object-fit: contain;
`;
const SlideUserReward = ({ reward }) => {
  const [open, setOpen] = useState(false);
  const toggleOpenReward = () => {
    setOpen(!open);
  };

  return (
    <>
      <Reward>
        <RewardImg src={reward.imageURL} onClick={toggleOpenReward} />
        <TextSpanStyle>{reward.rewardName}</TextSpanStyle>
      </Reward>
      <DialogWindow open={open} onClose={toggleOpenReward}>
        <RewardFullWidth src={reward.imageURL} />
      </DialogWindow>
    </>
  );
};

export default SlideUserReward;
