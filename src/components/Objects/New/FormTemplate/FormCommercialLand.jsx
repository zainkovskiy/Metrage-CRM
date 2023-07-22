import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { ObjectSliderBox, FormWrapper } from '../../ObjectsStyle';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { Box } from 'ui/Box/Box';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';

const FormCommercialLand = () => {
  const { control, getValues } = useFormContext();
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
            name='BargainTermsPrice'
            control={control}
            render={({ field }) => (
              <InputUI onChange={(e) => { field.onChange(parseInt(e.target.value.split(' ').join(''))) }}
                value={field.value ? useNumberTriad(field.value) : ''}
                label='Цена' fullWidth
              />
            )}
          />
          <Controller
            name='BargainTermsVatType'
            control={control}
            defaultValue='included'
            render={({ field }) => (
              <SelectUI onChange={field.onChange} select={field.value} label='Тип НДС'>
                <SelectItemUI value='included'>НДС включен</SelectItemUI>
                <SelectItemUI value='notIncluded'>НДС не облагается</SelectItemUI>
                <SelectItemUI value='usn'>УСН (упрощенная система налогообложения)</SelectItemUI>
              </SelectUI>
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
            name='LandStatus'
            control={control}
            render={({ field }) => (
              <SelectUI onChange={field.onChange} select={field.value} label='Статус земли'>
                <SelectItemUI value='forAgriculturalPurposes'>Участок сельскохозяйственного назначения</SelectItemUI>
                <SelectItemUI value='industryTransportCommunications'>Участок промышленности, транспорта, связи и иного не сельхоз. назначения</SelectItemUI>
                <SelectItemUI value='settlements'>Поселений</SelectItemUI>
              </SelectUI>
            )}
          />
          <Controller
            name='PermittedUseType'
            control={control}
            render={({ field }) => (
              <SelectUI onChange={field.onChange} select={field.value} label='Вид разрешённого использования'>
                <SelectItemUI value='agricultural'>Cельскохозяйственное использование</SelectItemUI>
                <SelectItemUI value='businessManagement'>Деловое управление</SelectItemUI>
                <SelectItemUI value='commonUseArea'>Общее пользование территории</SelectItemUI>
                <SelectItemUI value='highriseBuildings'>Высотная застройка</SelectItemUI>
                <SelectItemUI value='hotelAmenities'>Гостиничное обслуживание</SelectItemUI>
                <SelectItemUI value='individualHousingConstruction'>Индивидуальное жилищное строительство (ИЖС)</SelectItemUI>
                <SelectItemUI value='industry'>Промышленность</SelectItemUI>
                <SelectItemUI value='leisure'>Отдых (рекреация)</SelectItemUI>
                <SelectItemUI value='lowriseHousing'>Малоэтажное жилищное строительство (МЖС)</SelectItemUI>
                <SelectItemUI value='publicUseOfCapitalConstruction'>Общественное использование объектов капитального строительства</SelectItemUI>
                <SelectItemUI value='serviceVehicles'>Обслуживание автотранспорта</SelectItemUI>
                <SelectItemUI value='shoppingCenters'>Торговые центры</SelectItemUI>
                <SelectItemUI value='warehouses'>Склады</SelectItemUI>
              </SelectUI>
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Электричество</TextSpanStyle>
          <Controller
            control={control}
            name='ElectricityLocationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='border' active={field.value}>По границе участка</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='location' active={field.value}>На участке</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='no' active={field.value}>Нет</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Газ</TextSpanStyle>
          <Controller
            control={control}
            name='GasLocationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='border' active={field.value}>По границе участка</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='location' active={field.value}>На участке</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='no' active={field.value}>Нет</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Канализация</TextSpanStyle>
          <Controller
            control={control}
            name='DrainageLocationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='border' active={field.value}>По границе участка</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='location' active={field.value}>На участке</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='no' active={field.value}>Нет</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Водоснабжение</TextSpanStyle>
          <Controller
            control={control}
            name='WaterLocationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='border' active={field.value}>По границе участка</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='location' active={field.value}>На участке</ButtonToggleItem>
                <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='no' active={field.value}>Нет</ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
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

export default FormCommercialLand;