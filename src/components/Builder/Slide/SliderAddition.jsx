import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import SliderManagers from './SliderManagers';
import SliderFeature from './SliderFeature';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import DialogWindow from 'components/Main/DialogWindow';
import DialogAddEditManager from './DialogAddEditManager';

const SliderAdditionStyle = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const AdditionWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const SeparatorLine = styled.span`
  height: 100%;
  width: 1px;
  background-color: #786464;
`;
const Title = styled.span`
  display: inline-flex;
  width: 100%;
  gap: 0.5rem;
`;
const SliderAddition = () => {
  const [manager, setManager] = useState(false);
  const openNewManager = () => {
    setManager('new');
  };
  const openEditManager = (manager) => {
    setManager(manager);
  };
  const closeWindowManager = () => {
    setManager(null);
  };
  return (
    <SliderAdditionStyle>
      <SliderTitle>
        <Title>
          Менеджеры
          <IconButton onClick={openNewManager}>
            <Plus />
          </IconButton>
        </Title>
        <Title>Характиристики</Title>
      </SliderTitle>
      <AdditionWrapper>
        <SliderManagers openEditManager={openEditManager} />
        <SeparatorLine />
        <SliderFeature />
      </AdditionWrapper>
      <DialogWindow open={Boolean(manager)} onClose={closeWindowManager}>
        <DialogAddEditManager onClose={closeWindowManager} manager={manager} />
      </DialogWindow>
    </SliderAdditionStyle>
  );
};

export default SliderAddition;
