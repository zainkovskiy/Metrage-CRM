import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';

import * as S from './slideSlide';
import { SliderTitle } from '../../../styles/slider';
import SlideFixationAgent from './SlideFixationAgent';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

const SlideFixationAgency = () => {
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { setValue } = useFormContext();
  const [target, setTarget] = useState(null);
  const closeChangeWindow = () => {
    setTarget(null);
  };
  const changeTargetUser = (user) => {
    fixation[target] = user;
    setValue(`${target}`, user, { shouldDirty: true });
    closeChangeWindow();
  };
  return (
    <S.FixationBlock>
      <SliderTitle>Агентство</SliderTitle>
      <SlideFixationAgent
        agent={fixation.realtor}
        clickChange={() => setTarget('realtor')}
        title='Агент:'
        showButton={!isNotAdmin}
      />
      <SlideFixationAgent
        agent={fixation.broker}
        clickChange={() => setTarget('broker')}
        title='Исполнитель:'
        showButton={!isNotAdmin}
      />
      <DialogWindow open={Boolean(target)} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder
            onClose={closeChangeWindow}
            onChange={changeTargetUser}
            title={target === 'realtor' ? 'Агент' : 'Исполнитель'}
          />
        </div>
      </DialogWindow>
    </S.FixationBlock>
  );
};

export default SlideFixationAgency;
