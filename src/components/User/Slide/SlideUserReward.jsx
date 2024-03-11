import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const Reward = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;
const RewardImg = styled.img`
  height: 48px;
`;

const SlideUserReward = ({ reward }) => {
  return (
    <Reward>
      <RewardImg src={reward.imageURL} />
      <TextSpanStyle>{reward.rewardName}</TextSpanStyle>
    </Reward>
  );
};

export default SlideUserReward;
