import React from 'react';
import { Controller } from 'react-hook-form';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { TextSpanStyle } from 'styles/styles';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { ButtonUI } from 'ui/ButtonUI';
const SlideDialogRealtorForm1 = ({
  control,
  watch,
  getValues,
  onClose,
  onSubmit,
}) => {
  watch('typeOfCalculation');
  return (
    <>
      <Box column gap='0.2rem' ai='normal'>
        <Controller
          control={control}
          name='typeOfCalculation'
          rules={{ required: true }}
          render={({ field }) => (
            <LabelStyle>
              Как мы расчитываем Агента?*
              <ButtonToggleGroup fullWidth>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='full'
                  active={field.value}
                >
                  Полный расчет
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='half'
                  active={field.value}
                >
                  Частично
                </ButtonToggleItem>
              </ButtonToggleGroup>
            </LabelStyle>
          )}
        />
        {getValues('typeOfCalculation') === 'full' ? (
          <TextSpanStyle size={10}>
            *Коммисия по сделке получена полностью, и Агент получит полную
            положенную ему сумму
          </TextSpanStyle>
        ) : (
          <TextSpanStyle size={10}>
            *Коммисия по сделке получена частично, и Агент получит только часть
            причитающейся ему суммы
          </TextSpanStyle>
        )}
      </Box>
      <Controller
        name='comissionSize'
        control={control}
        render={({ field }) => (
          <InputUI
            fullWidth
            label={
              getValues('typeOfCalculation') === 'full'
                ? 'Проверьте, пожалуйста, сумму ЗП для Агента:'
                : 'Укажите, пожалуйста, сумму ЗП для Агента:'
            }
            value={field.value || ''}
            small
            disabled={getValues('typeOfCalculation') === 'full'}
            onChange={field.onChange}
            type='number'
          />
        )}
      />
      <Box column gap='0'>
        <Box gap='0.2rem' jc='flex-start' fullWidth>
          <TextSpanStyle size={10}>Специалист</TextSpanStyle>
          <TextSpanStyle size={10} bold>
            {getValues('realtorName')}
          </TextSpanStyle>
        </Box>
        <Box gap='0.2rem' jc='flex-start' fullWidth>
          <TextSpanStyle size={10}>Указанная полная сумма</TextSpanStyle>
          <TextSpanStyle size={10} bold>
            {getValues('comissionSize')} руб.
          </TextSpanStyle>
        </Box>
      </Box>
      <Controller
        control={control}
        name='ddsType'
        rules={{ required: true }}
        render={({ field }) => (
          <LabelStyle>
            Как агент получил денежные средства?
            <ButtonToggleGroup fullWidth>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='nal'
                active={field.value}
              >
                Наличные
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='beznal'
                active={field.value}
              >
                Безнал
              </ButtonToggleItem>
            </ButtonToggleGroup>
          </LabelStyle>
        )}
      />
      {getValues('hasMultiplyAgents') && (
        <>
          <TextSpanStyle>
            Мы видим, что в сделке участвуют несколько Агентов, поэтому, на
            всякий случай:
          </TextSpanStyle>
          <Controller
            name='agentVal'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Проверьте, пожалуйста, сумму ВАЛА Агента:'
                value={field.value || ''}
                small
                onChange={field.onChange}
                type='number'
              />
            )}
          />
          <Box gap='0.2rem' jc='flex-start'>
            <TextSpanStyle size={10}>Специалист</TextSpanStyle>
            <TextSpanStyle size={10} bold>
              {getValues('realtorName')}
            </TextSpanStyle>
          </Box>
        </>
      )}
      {!getValues('hasMultiplyAgents') &&
        getValues('typeOfCalculation') === 'half' && (
          <>
            <TextSpanStyle>
              В виду частичного расчета, укажите сумму комиссии агентства,
              зашедшую на данный момент
            </TextSpanStyle>
            <Controller
              name='agencyComission'
              control={control}
              render={({ field }) => (
                <InputUI
                  fullWidth
                  label='Комиссия агентства:'
                  value={field.value || ''}
                  small
                  type='number'
                  onChange={field.onChange}
                />
              )}
            />
          </>
        )}
      <TextSpanStyle>
        Мы можем сразу создать запись в ДДС Филиала о данном факте, либо Вы
        можете это сделать позже сами
      </TextSpanStyle>
      <Controller
        control={control}
        name='createDds'
        render={({ field }) => (
          <CheckboxUI
            label='Создать запись ДДС'
            onChange={(e) => {
              field.onChange(e.target.checked);
            }}
            defaultChecked={field.value || false}
            id='createDds'
          />
        )}
      />
      <Box>
        <ButtonUI size='small' variant='outline' fullWidth onClick={onClose}>
          Отмена
        </ButtonUI>
        <ButtonUI size='small' fullWidth onClick={onSubmit}>
          Завершить
        </ButtonUI>
      </Box>
    </>
  );
};

export default SlideDialogRealtorForm1;
