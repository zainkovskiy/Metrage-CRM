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

const FormoCottage = () => {
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
              <InputUI onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''} label='Кадастровый номер' fullWidth />
            )}
          />
          <Controller
            name='LandCadastralNumber'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''} label='Кадастровый номер земли' fullWidth />
            )}
          />
          <Controller
            name='Price'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => { field.onChange(parseInt(e.target.value.split(' ').join(''))) }}
                value={field.value ? useNumberTriad(field.value) : ''}
                label='Цена' fullWidth
              />
            )}
          />
          <Controller
            name='FloorsCount'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Этажей в доме' fullWidth type='number' />
            )}
          />
          <Controller
            name='TotalArea'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Общая площадь' fullWidth type='number' />
            )}
          />
          <Controller
            name='LandArea'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Площадь участка' fullWidth type='number' />
            )}
          />
          <Controller
            name='BedroomsCount'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Количество спален' fullWidth type='number' />
            )}
          />
          <Controller
            name='WcsCount'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Количество санузлов' fullWidth type='number' />
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Вид земельного участка</TextSpanStyle>
          <Controller
            control={control}
            name='PermittedLandUseType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='farm' active={field.value}>Сельскохозяйственное</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='gardening' active={field.value}>Садоводство</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='horticulture' active={field.value}>Огородничество</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='individualHousingConstruction' active={field.value}>ИЖС</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='other' active={field.value}>Иное</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='privateFarm' active={field.value}>Личное подсобное хозяйство</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='suburbanNonProfitPartnership' active={field.value}>Дачное хозяйство</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Материал дома</TextSpanStyle>
          <Controller
            control={control}
            name='MaterialTypesMaterialType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='aerocreteBlock' active={field.value}>Газобетонный блок</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='boards' active={field.value}>Щитовой</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='brick' active={field.value}>Кирпичный</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='foamConcreteBlock' active={field.value}>Пенобетонный блок</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='gasSilicateBlock' active={field.value}>Газосиликатный блок</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='monolith' active={field.value}>Монолитный</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='wireframe' active={field.value}>Каркасный</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='wood' active={field.value}>Деревянный</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Состояние дома</TextSpanStyle>
          <Controller
            control={control}
            name='HouseCondition'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='interiorDecorationRequired' active={field.value}>Без внутренней отделки</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='majorRepairsRequired' active={field.value}>Требует капитального ремонта или под снос</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='ready' active={field.value}>Готов к проживанию</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='unfinished' active={field.value}>Недостроенный</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Ремонт</TextSpanStyle>
          <Controller
            control={control}
            name='RepairType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='cosmetic' active={field.value}>Косметический</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='design' active={field.value}>Дизайнерский</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='euro' active={field.value}>Евроремонт</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='no' active={field.value}>Без ремонта</ButtonToggleItem>
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
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='borehole' active={field.value}>Скважина</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='central' active={field.value}>Центральное</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='well' active={field.value}>Колодец</ButtonToggleItem>
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
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='central' active={field.value}>Центральная</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='cesspool' active={field.value}>Выгребная яма</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='septicTank' active={field.value}>Септик</ButtonToggleItem>
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
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='border' active={field.value}>По границе участка</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='gasBottle' active={field.value}>Газовый баллон</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='gasHolder' active={field.value}>Газгольдер</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='main' active={field.value}>Магистральный</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Санузел</TextSpanStyle>
          <Controller
            control={control}
            name='WcLocationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='indoors' active={field.value}>В доме</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='outdoors' active={field.value}>На улице</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <FormWrapper>
          <Box column ai='flex-start'>
            <Controller
              control={control}
              name='MortgageAllowed'
              render={({ field }) => (
                <CheckboxUI
                  label='Ипотека'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='MortgageAllowed'
                />
              )}
            />
            <Controller
              control={control}
              name='HasElectricity'
              render={({ field }) => (
                <CheckboxUI
                  label='Электричество'
                  onChange={(e) => { field.onChange(e.target.checked) }}
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
                  onChange={(e) => { field.onChange(e.target.checked) }}
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
                  onChange={(e) => { field.onChange(e.target.checked) }}
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
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HasDrainage'
                />
              )}
            />
            <Controller
              control={control}
              name='HasSecurity'
              render={({ field }) => (
                <CheckboxUI
                  label='Охрана'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HasSecurity'
                />
              )}
            />
          </Box>
          <Box column ai='flex-start'>
            <Controller
              control={control}
              name='HasBathhouse'
              render={({ field }) => (
                <CheckboxUI
                  label='Есть баня'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HasBathhouse'
                />
              )}
            />
            <Controller
              control={control}
              name='HasGarage'
              render={({ field }) => (
                <CheckboxUI
                  label='Есть гараж'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HasGarage'
                />
              )}
            />
            <Controller
              control={control}
              name='HasPool'
              render={({ field }) => (
                <CheckboxUI
                  label='Есть бассейн'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HasPool'
                />
              )}
            />
            <Controller
              control={control}
              name='HouseHasTerrace'
              render={({ field }) => (
                <CheckboxUI
                  label='Есть терасса'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HouseHasTerrace'
                />
              )}
            />
            <Controller
              control={control}
              name='HouseHasCellar'
              render={({ field }) => (
                <CheckboxUI
                  label='Есть погреб'
                  onChange={(e) => { field.onChange(e.target.checked) }}
                  defaultChecked={field.value || false}
                  id='HouseHasCellar'
                />
              )}
            />
          </Box>
        </FormWrapper>
        <FormWrapper>
          <Controller
            name='AgentBonusValue'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''} label='Бонус агенту' fullWidth type='number' />
            )}
          />
          <Controller
            name='AgentBonusPaymentType'
            control={control}
            render={({ field }) => (
              <SelectUI onChange={field.onChange} select={field.value} label='Тип оплаты'>
                <SelectItemUI value='fixed'>Фиксированный</SelectItemUI>
                <SelectItemUI value='percent'>Процент</SelectItemUI>
              </SelectUI>
            )}
          />
        </FormWrapper>
      </ObjectSliderBox>
      <ObjectSliderBox
        $column
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ButtonUI type='submit'>Создать</ButtonUI>
      </ObjectSliderBox>
    </>
  );
};

export default FormoCottage;