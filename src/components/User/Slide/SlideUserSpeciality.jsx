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
  const isAdmin = user?.rights?.admin || false;
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Специализация</SliderTitle>
        <Controller
          name='speciality'
          control={control}
          render={({ field }) => (
            <SelectMultipleUI
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value}
              multiple
              fullWidth
              disabled={!isAdmin}
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
        <TextSpanStyle $fullWidth>
          Рейтинг по Валу (Год): {user?.rank?.year || ''}
        </TextSpanStyle>
        <TextSpanStyle $fullWidth>
          Рейтинг по Валу (Текущий месяц): {user?.rank?.month || ''}
        </TextSpanStyle>
        {user.rewards.map((reward) => (
          <SlideUserReward key={reward.UID} reward={reward} />
        ))}
      </Box>
    </SliderBlock>
  );
};

export default SlideUserSpeciality;
