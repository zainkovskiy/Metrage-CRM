import styled from 'styled-components';

export const DashboardUser = styled.div`
  grid-area: user;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem;
  white-space: nowrap;
`;
export const DashboardUserWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
export const DashboardUserAvatar = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  object-position: top;
  border-radius: 60px;
  @media (max-width: 480px) {
    display: none;
  }
`;
export const DashboardUserReward = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
export const DashboardUserRewardWrap = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
