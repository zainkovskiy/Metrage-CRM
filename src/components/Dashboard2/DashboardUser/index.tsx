import React from 'react';
import { IViewer } from '../type';
import * as S from './style';
import TextUI from '../../../uiTs/TextUI';

const DashboardUser = (props: IViewer) => {
  const { avatar, fullName, posititon, rewards } = props;
  return (
    <S.DashboardUser>
      <S.DashboardUserWrap>
        {rewards.length > 0 && (
          <S.DashboardUserRewardWrap>
            {rewards.map((reward, idx) => (
              <S.DashboardUserReward
                key={idx}
                src={reward.picture}
                alt={reward.title}
                title={reward.title}
              />
            ))}
          </S.DashboardUserRewardWrap>
        )}
        <TextUI bold size={18}>
          {fullName}
        </TextUI>
        <TextUI size={12} color='grey'>
          {posititon}
        </TextUI>
      </S.DashboardUserWrap>
      <S.DashboardUserAvatar src={avatar} />
    </S.DashboardUser>
  );
};

export default DashboardUser;
