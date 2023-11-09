import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import { TextSpanStyle } from 'styles/styles';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import WindowChangePosition from './WindowChangePosition';
import DialogWindow from 'components/Main/DialogWindow';
import { setNewUserValue } from '../../../api/usersApi';

const SlideUserAddition = () => {
  const user = useAsyncValue();
  const { control } = useFormContext();
  const [showPosition, setShowPostion] = useState(false);
  const isAdmin = user?.rights?.admin || false;
  const toggleShowPosition = () => {
    setShowPostion(!showPosition);
  };
  const setPosition = (newPosition) => {
    user.position = newPosition;
    setNewUserValue({
      UID: user?.UID,
      position: newPosition,
    });
  };
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Дополнительно</SliderTitle>
        <Box column fullWidth>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle>Должность:</TextSpanStyle>
            <Box>
              <TextSpanStyle>
                {user?.position?.positionName || ''}
              </TextSpanStyle>
              {isAdmin && (
                <ButtonLink
                  color='#85009e'
                  size={12}
                  onClick={toggleShowPosition}
                >
                  Сменить
                </ButtonLink>
              )}
            </Box>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle>Пол:</TextSpanStyle>
            {isAdmin ? (
              <Controller
                control={control}
                name='sex'
                render={({ field }) => (
                  <SelectUI
                    select={field.value || ''}
                    onChange={field.onChange}
                    small
                  >
                    <SelectItemUI value='Муж.'>Муж.</SelectItemUI>
                    <SelectItemUI value='Жен.'>Жен.</SelectItemUI>
                  </SelectUI>
                )}
              />
            ) : (
              <TextSpanStyle>{user?.sex}</TextSpanStyle>
            )}
          </Box>
          {isAdmin && (
            <Box jc='space-between' fullWidth>
              <TextSpanStyle>Права</TextSpanStyle>
              <Box>
                <Controller
                  control={control}
                  name='isAdmin'
                  render={({ field }) => (
                    <CheckboxUI
                      label='Администратор'
                      size='small'
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                      checked={field.value || false}
                      id='isAdmin'
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='isСashier'
                  render={({ field }) => (
                    <CheckboxUI
                      label='Кассир'
                      size='small'
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                      checked={field.value || false}
                      id='isСashier'
                    />
                  )}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <DialogWindow open={showPosition} onClose={toggleShowPosition}>
        <WindowChangePosition
          onChange={setPosition}
          onClose={toggleShowPosition}
        ></WindowChangePosition>
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideUserAddition;
