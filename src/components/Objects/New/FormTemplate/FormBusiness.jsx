import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { ObjectSliderBox, FormWrapper } from '../../ObjectsStyle';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { Box } from 'ui/Box/Box';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { TextSpanStyle } from 'styles/styles';
import { getSpecialityTypes } from 'api/objectAPI';
import { useNumberTriad } from 'hooks/StringHook';

const FormBusiness = () => {
  const { control, setValue } = useFormContext();
  const { errors } = useFormState();
  const [specialityTypes, setSpecialityTypes] = useState([]);
  useEffect(() => {
    requestSpecialityTypes();
  }, []);

  const requestSpecialityTypes = async (type = 'readyBusiness') => {
    const data = await getSpecialityTypes(type);
    setSpecialityTypes(data);
  };

  const setTypeBusiness = (value, onChange) => {
    onChange(value);
    requestSpecialityTypes(value);
    setValue('SpecialtyTypes', '');
  };

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
            name='BargainTermsVatType'
            control={control}
            defaultValue='included'
            render={({ field }) => (
              <SelectUI
                onChange={field.onChange}
                select={field.value}
                label='Тип НДС'
              >
                <SelectItemUI value='included'>НДС включен</SelectItemUI>
                <SelectItemUI value='notIncluded'>НДС не включен</SelectItemUI>
                <SelectItemUI value='usn'>
                  УСН (упрощенная система налогообложения)
                </SelectItemUI>
              </SelectUI>
            )}
          />
          <Controller
            name='ReadyBusinessType'
            control={control}
            defaultValue='readyBusiness'
            render={({ field }) => (
              <SelectUI
                onChange={(value) => setTypeBusiness(value, field.onChange)}
                select={field.value}
                label='Тип бизнеса'
              >
                <SelectItemUI value='readyBusiness'>
                  Готовый бизнес
                </SelectItemUI>
                <SelectItemUI value='rentalBusiness'>
                  Арендный бизнес
                </SelectItemUI>
              </SelectUI>
            )}
          />
          <Controller
            name='SpecialtyTypes'
            control={control}
            render={({ field }) => (
              <SelectAutoсompleteUI
                label='Возможное назначение'
                options={specialityTypes}
                getOptionsLabel={(options) => options.specialtyType}
                onChange={(option) => field.onChange(option)}
                value={field.value}
              />
            )}
          />
          <Controller
            name='FloorNumber'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Этаж'
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
          <Controller
            name='MonthlyIncome'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Месячная прибыль'
                fullWidth
                type='number'
              />
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>
            Недвижимость в собственности или в аренде
          </TextSpanStyle>
          <Controller
            control={control}
            name='EstateType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='owned'
                  active={field.value}
                >
                  В собственности
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='rent'
                  active={field.value}
                >
                  В аренде
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Controller
          control={control}
          name='HasEquipment'
          render={({ field }) => (
            <CheckboxUI
              label='Есть оборудование'
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              defaultChecked={field.value || false}
              id='HasEquipment'
            />
          )}
        />
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

export default FormBusiness;
