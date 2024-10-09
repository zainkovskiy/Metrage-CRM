import React from 'react';
import Loader from '../../Main/Loader';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as S from './style';
import { IDashboardForm, IDashboardFormUser, IDashboardPeriod } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardWindowMode from '../DashboardWindowMode';
import { ButtonToggleGroup, ButtonToggleItem } from '../../../ui/ButtonToggle';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardWindowViewType from '../DashboardWindowViewType';
import { ButtonUI } from '../../../ui/ButtonUI';
import Input from '../../../uiTs/Input';
import { SelectItemUI, SelectUI } from '../../../ui/SelectUI';

interface DashboardWindowFormProps {
  onClose: () => void;
  period: IDashboardPeriod;
  setNewPeriod: (data: IDashboardPeriod) => void;
}

const DashboardWindowFormPeriod = ({
  onClose,
  period,
  setNewPeriod,
}: DashboardWindowFormProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { isLoading },
  } = useForm<IDashboardPeriod>({
    defaultValues: period,
  });

  const onSubmit: SubmitHandler<IDashboardPeriod> = (data) => {
    setNewPeriod(data);
    onClose();
  };
  if (isLoading) {
    return <Loader fill={null} />;
  }
  watch('periodType');
  return (
    <S.DashboardWindowForm onSubmit={handleSubmit(onSubmit)}>
      <S.DashboardWindowFormFileds>
        <TextUI>Установка периода:</TextUI>
        <Controller
          control={control}
          name='periodType'
          render={({ field }) => (
            <SelectUI
              onChange={(newSelect: string) => field.onChange(newSelect)}
              select={field.value}
            >
              <SelectItemUI value='currentMonth'>текущий месяц</SelectItemUI>
              <SelectItemUI value='previousMonth'>Прошлый месяц</SelectItemUI>
              <SelectItemUI value='custom'>диапазон дат</SelectItemUI>
            </SelectUI>
          )}
        />
      </S.DashboardWindowFormFileds>
      <S.DashboardWindowFormInputs>
        <S.DashboardWindowFormFileds>
          <TextUI>С:</TextUI>
          <Controller
            control={control}
            name='fromPeriod'
            render={({ field }) => (
              <Input
                onChange={field.onChange}
                value={field.value || ''}
                type='date'
                disabled={getValues('periodType') !== 'custom'}
              />
            )}
          />
        </S.DashboardWindowFormFileds>
        <S.DashboardWindowFormFileds>
          <TextUI>До:</TextUI>
          <Controller
            control={control}
            name='toPeriod'
            render={({ field }) => (
              <Input
                onChange={field.onChange}
                value={field.value || ''}
                type='date'
                disabled={getValues('periodType') !== 'custom'}
              />
            )}
          />
        </S.DashboardWindowFormFileds>
      </S.DashboardWindowFormInputs>
      <S.DashboardWindowFormButtons>
        <ButtonUI
          type='button'
          fullWidth
          variant='outline'
          disabled={false}
          onClick={onClose}
          size='small'
        >
          Отмена
        </ButtonUI>
        <ButtonUI
          type='submit'
          fullWidth
          variant='fill'
          disabled={false}
          onClick={() => {}}
          size='small'
        >
          Применить
        </ButtonUI>
      </S.DashboardWindowFormButtons>
    </S.DashboardWindowForm>
  );
};

export default DashboardWindowFormPeriod;
