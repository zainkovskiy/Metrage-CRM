import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import { TextSpanStyle } from 'styles/styles';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import SlideUserReward from './SlideUserReward';

const SlideUserSpeciality = () => {
  const user = useAsyncValue();
  const { control } = useFormContext();
  const editMain = user?.rights?.editMain || false;
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Специализация</SliderTitle>
        <Box wrap jc='flex-start' fullWidth>
          <TextSpanStyle bold>
            Рейтинг по Валу (Год): {user?.rank?.year || ''}
          </TextSpanStyle>
          {/* <TextSpanStyle bold>
            Рейтинг по Валу (Текущий месяц): {user?.rank?.month || ''}
          </TextSpanStyle> */}
        </Box>
        <Controller
          name='speciality'
          control={control}
          render={({ field }) => (
            <SelectMultipleUI
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value}
              multiple
              fullWidth
              disabled={!editMain}
              small
              // label='Тип объекта'
            >
              {user.speciality.avalaible.map((item) => (
                <SelectMultipleItemUI value={item} key={item}>
                  {item}
                </SelectMultipleItemUI>
              ))}
            </SelectMultipleUI>
          )}
        />
        {user.rewards.map((reward) => (
          <SlideUserReward key={reward.UID} reward={reward} />
        ))}
      </Box>
    </SliderBlock>
  );
};

export default SlideUserSpeciality;
