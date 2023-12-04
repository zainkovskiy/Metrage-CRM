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

const FormLand = ({ typeDeal }) => {
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
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''}
                label='Кадастровый номер'
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
            name='LandArea'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Площадь участка, в сотках'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='WcsCount'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Количество санузлов'
                fullWidth
                type='number'
              />
            )}
          />
          {typeDeal === 'buy' && (
            <Controller
              name='SaleType'
              control={control}
              render={({ field }) => (
                <SelectUI
                  onChange={field.onChange}
                  select={field.value || 'free'}
                  label='Тип продажи'
                >
                  <SelectItemUI value='free'>Свободная</SelectItemUI>
                  <SelectItemUI value='alternative'>
                    Альтернативная
                  </SelectItemUI>
                </SelectUI>
              )}
            />
          )}
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Вид земельного участка</TextSpanStyle>
          <Controller
            control={control}
            name='PermittedLandUseType'
            rules={{ required: 'Поле обязательное' }}
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='farm'
                  active={field.value}
                >
                  Сельскохозяйственное
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='gardening'
                  active={field.value}
                >
                  Садоводство
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='horticulture'
                  active={field.value}
                >
                  Огородничество
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='individualHousingConstruction'
                  active={field.value}
                >
                  ИЖС
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='other'
                  active={field.value}
                >
                  Иное
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='privateFarm'
                  active={field.value}
                >
                  Личное подсобное хозяйство
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='suburbanNonProfitPartnership'
                  active={field.value}
                >
                  Дачное хозяйство
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
          {errors?.PermittedLandUseType && (
            <TextSpanStyle size={12} color='red'>
              {errors?.PermittedLandUseType?.message}
            </TextSpanStyle>
          )}
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Ремонт</TextSpanStyle>
          <Controller
            control={control}
            name='RepairType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='cosmetic'
                  active={field.value}
                >
                  Косметический
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='design'
                  active={field.value}
                >
                  Дизайнерский
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='euro'
                  active={field.value}
                >
                  Евроремонт
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Без ремонта
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Тип водоснабжения</TextSpanStyle>
          <Controller
            control={control}
            name='WaterSuburbanWaterType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='borehole'
                  active={field.value}
                >
                  Скважина
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='central'
                  active={field.value}
                >
                  Центральное
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='well'
                  active={field.value}
                >
                  Колодец
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Тип канализации</TextSpanStyle>
          <Controller
            control={control}
            name='DrainageType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='central'
                  active={field.value}
                >
                  Центральная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='cesspool'
                  active={field.value}
                >
                  Выгребная яма
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='septicTank'
                  active={field.value}
                >
                  Септик
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Тип газа</TextSpanStyle>
          <Controller
            control={control}
            name='GasType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='border'
                  active={field.value}
                >
                  По границе участка
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='gasBottle'
                  active={field.value}
                >
                  Газовый баллон
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='gasHolder'
                  active={field.value}
                >
                  Газгольдер
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='main'
                  active={field.value}
                >
                  Магистральный
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
            name='HasGas'
            render={({ field }) => (
              <CheckboxUI
                label='Газ'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='HasGas'
              />
            )}
          />
          <Controller
            control={control}
            name='HasDrainage'
            render={({ field }) => (
              <CheckboxUI
                label='Канализация'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='HasDrainage'
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

export default FormLand;
