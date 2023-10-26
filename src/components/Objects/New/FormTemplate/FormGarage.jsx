import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { ObjectSliderBox, FormWrapper } from '../../ObjectsStyle';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { Box } from 'ui/Box/Box';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';

const FormGarage = () => {
  const { control } = useFormContext();
  const { errors } = useFormState();
  return (
    <>
      <ObjectSliderBox
        $column
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FormWrapper>
          <Controller
            name='BuildingCadastralNumber'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value.split(' ').join('')));
                }}
                value={field.value ? useNumberTriad(field.value) : ''}
                label='Цена'
                fullWidth
              />
            )}
          />
          <Controller
            name='LandCadastralNumber'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''}
                label='Кадастровый номер земли'
                fullWidth
              />
            )}
          />
          <Controller
            name='Price'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Цена'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='TotalArea'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Общая площадь, м2'
                fullWidth
                type='number'
              />
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Тип гаража</TextSpanStyle>
          <Controller
            control={control}
            name='GarageType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='box'
                  active={field.value}
                >
                  Бокс
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='garage'
                  active={field.value}
                >
                  Гараж
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='parkingPlace'
                  active={field.value}
                >
                  Машиноместо
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Подтип гаража</TextSpanStyle>
          <Controller
            control={control}
            name='GarageTypeType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='builtIn'
                  active={field.value}
                >
                  Встроенный
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='capital'
                  active={field.value}
                >
                  Капитальный
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='samostroy'
                  active={field.value}
                >
                  Самострой
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='shell'
                  active={field.value}
                >
                  Ракушка
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <Controller
            control={control}
            name='HasElectricity'
            render={({ field }) => (
              <CheckboxUI
                label='Электричество'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='HasElectricity'
              />
            )}
          />
          <Controller
            control={control}
            name='HasWater'
            render={({ field }) => (
              <CheckboxUI
                label='Вода'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='HasWater'
              />
            )}
          />
          <Controller
            control={control}
            name='HasSecurity'
            render={({ field }) => (
              <CheckboxUI
                label='Охрана'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='HasSecurity'
              />
            )}
          />
        </Box>
        <FormWrapper>
          <Controller
            name='AgentBonusValue'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Бонус агенту'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='AgentBonusPaymentType'
            control={control}
            render={({ field }) => (
              <SelectUI
                onChange={field.onChange}
                select={field.value}
                label='Тип оплаты'
              >
                <SelectItemUI value='fixed'>Фиксированный</SelectItemUI>
                <SelectItemUI value='percent'>Процент</SelectItemUI>
              </SelectUI>
            )}
          />
        </FormWrapper>
      </ObjectSliderBox>
      {/* <ObjectSliderBox
        $column
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ButtonUI type='submit'>Сохранить</ButtonUI>
      </ObjectSliderBox> */}
    </>
  );
};

export default FormGarage;
