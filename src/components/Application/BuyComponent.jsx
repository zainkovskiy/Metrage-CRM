import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectLaag, SelectLaagItemUI } from 'ui/SelectLaag/SelectLaag';
import { SliderTitle } from '../../styles/slider';
import { ButtonLink } from 'ui/ButtonLink';
import { InputUI } from 'ui/InputUI';
import DialogWindow from 'components/Main/DialogWindow';
import DialogAddFeature from './Slide/DialogAddFeature';
import DialogAddPlace from './Slide/DialogAddPlace';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';

const variants = {
  initial: {
    x: '-100%',
  },
  open: {
    x: 0,
  },
  close: {
    x: '100%',
  },
};
const SellComponentStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const InputsField = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
`;
const MetroCircle = styled.div`
  background-color: ${({ $color }) => `#${$color}` || '#ccc'};
  width: 15px;
  height: 15px;
  border-radius: 40px;
`;

const BuyComponent = ({ firstMout }) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const { errors } = useFormState();
  const [addFeature, setAddFeature] = useState(false);
  const [openPlace, setOpenPlace] = useState(false);
  const toggleFeature = () => {
    setAddFeature(!addFeature);
  };
  const togglePlace = () => {
    setOpenPlace(!openPlace);
  };
  const removePlace = (source, idx) => {
    let array = getValues(source);
    array.splice(idx, 1);
    setValue(source, array, {
      shouldDirty: true,
    });
  };
  const getCorrectValue = (field) => {
    if (field.name === 'priceFrom' || field.name === 'priceTo') {
      return field.value ? useNumberTriad(field.value) : '';
    }
    return field.value || '';
  };
  const correctOnChangeField = (e, field) => {
    if (field.name === 'priceFrom' || field.name === 'priceTo') {
      return field.onChange(parseInt(e.target.value.split(' ').join('')));
    }
    return field.onChange(e.target.value);
  };
  watch('cordsList');
  watch('addressList');
  watch('metroList');
  watch('typePlace');
  watch('featureList');
  return (
    <>
      <SellComponentStyle
        variants={variants}
        initial={firstMout ? { x: 0 } : 'initial'}
        animate='open'
        exit='close'
        transition={'linear'}
      >
        <InputsField>
          <Controller
            control={control}
            name='typePlace'
            rules={{ required: 'Выберите тип' }}
            render={({ field }) => (
              <SelectUI
                small
                select={field.value || ''}
                onChange={field.onChange}
                inputRef={field.ref}
                label='Тип объекта'
                error={errors?.typePlace}
              >
                <SelectItemUI value='Квартира'>Квартира</SelectItemUI>
                <SelectItemUI value='Комната'>Комната</SelectItemUI>
                <SelectItemUI value='Коммерческая недвижимость'>
                  Коммерческая недвижимость
                </SelectItemUI>
                <SelectItemUI value='Дом'>Дом</SelectItemUI>
                <SelectItemUI value='Земельный участок'>
                  Земельный участок
                </SelectItemUI>
                <SelectItemUI value='Гараж'>Гараж</SelectItemUI>
              </SelectUI>
            )}
          />
          {getValues('type') === 'buy' && (
            <>
              {getValues('typePlace') !== 'Коммерческая недвижимость' && (
                <Controller
                  control={control}
                  name='buyType'
                  render={({ field }) => (
                    <SelectUI
                      small
                      select={field.value || ''}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      label='Причина покупки'
                      error={errors?.buyType}
                    >
                      <SelectItemUI value='forMyself'>
                        Покупает себе
                      </SelectItemUI>
                      <SelectItemUI value='forBusiness'>
                        Для заработка
                      </SelectItemUI>
                    </SelectUI>
                  )}
                />
              )}
            </>
          )}
          {getValues('typePlace') === 'Коммерческая недвижимость' && (
            <Controller
              control={control}
              name='subtypePlace'
              render={({ field }) => (
                <SelectUI
                  small
                  select={field.value || ''}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  label='Категория'
                  error={errors?.buyType}
                >
                  <SelectItemUI value='freeAppointmentObject'>
                    Пом. Св. Назначения
                  </SelectItemUI>
                  <SelectItemUI value='office'>Офис</SelectItemUI>
                  <SelectItemUI value='industry'>Производство</SelectItemUI>
                  <SelectItemUI value='shoppingArea'>
                    Торг. Площадь
                  </SelectItemUI>
                  <SelectItemUI value='business'>Гот. Бизнес</SelectItemUI>
                  <SelectItemUI value='building'>Здания</SelectItemUI>
                  <SelectItemUI value='warehouse'>Склад</SelectItemUI>
                  <SelectItemUI value='commercialLand'>Земля</SelectItemUI>
                </SelectUI>
              )}
            />
          )}
        </InputsField>
        <SliderTitle ai='flex-end' size={14}>
          Характеристики
          <ButtonLink size={12} color='#84019e' onClick={toggleFeature}>
            Добавить/Удалить
          </ButtonLink>
        </SliderTitle>
        <InputsField>
          {getValues('featureList').map((input) => {
            if (featureInputList[input].field === 'select') {
              return (
                // <Controller
                //   key={input}
                //   control={control}
                //   name={input}
                //   render={({ field }) => (
                //     <SelectUI
                //       small
                //       select={field.value || ''}
                //       onChange={field.onChange}
                //       inputRef={field.ref}
                //       label={featureInputList[input].label}
                //     >
                //       {featureInputList[input].options.map((options) => (
                //         <SelectItemUI key={options.value} value={options.value}>
                //           {options.name}
                //         </SelectItemUI>
                //       ))}
                //     </SelectUI>
                //   )}
                // />
                <Controller
                  key={input}
                  control={control}
                  name={input}
                  render={({ field }) => (
                    <SelectLaag
                      small
                      select={field.value || ''}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      label={featureInputList[input].label}
                      overflowContainer
                    >
                      {featureInputList[input].options.map((options) => (
                        <SelectLaagItemUI
                          key={options.value}
                          value={options.value}
                        >
                          {options.name}
                        </SelectLaagItemUI>
                      ))}
                    </SelectLaag>
                  )}
                />
              );
            }
            return (
              <Controller
                key={input}
                control={control}
                name={input}
                render={({ field }) => (
                  <InputUI
                    small
                    value={getCorrectValue(field)}
                    onChange={(e) => {
                      correctOnChangeField(e, field);
                    }}
                    inputRef={field.ref}
                    label={featureInputList[input].label}
                    type={featureInputList[input].type}
                  />
                )}
              />
            );
          })}
        </InputsField>
        <SliderTitle ai='flex-end' size={14}>
          Местоположение
          <ButtonLink size={12} color='#84019e' onClick={togglePlace}>
            Добавить
          </ButtonLink>
        </SliderTitle>
        <Box column ai='normal'>
          {getValues('cordsList').map((cords, idx) => (
            <Box jc='space-between' key={idx}>
              <TextSpanStyle size={12}>Область на карте</TextSpanStyle>
              <ButtonLink
                size={10}
                color='#ef4242'
                onClick={() => removePlace('cordsList', idx)}
              >
                Удалить
              </ButtonLink>
            </Box>
          ))}
          {getValues('addressList').map((address, idx) => (
            <Box jc='space-between' key={idx}>
              <TextSpanStyle size={12}>
                {address?.value || 'Адрес'}
              </TextSpanStyle>
              <ButtonLink
                size={10}
                color='#ef4242'
                onClick={() => removePlace('addressList', idx)}
              >
                Удалить
              </ButtonLink>
            </Box>
          ))}
          {getValues('metroList').map((metro, idx) => (
            <Box jc='space-between' key={idx}>
              <Box>
                <MetroCircle $color={metro.metroColor} />
                <TextSpanStyle size={12}>
                  {`(${metro.metroLine}) ${metro.metroName}`}
                </TextSpanStyle>
              </Box>
              <ButtonLink
                size={10}
                color='#ef4242'
                onClick={() => removePlace('metroList', idx)}
              >
                Удалить
              </ButtonLink>
            </Box>
          ))}
        </Box>
      </SellComponentStyle>
      <DialogWindow open={addFeature} onClose={toggleFeature}>
        <DialogAddFeature onClose={toggleFeature} />
      </DialogWindow>
      <DialogWindow open={openPlace} onClose={togglePlace}>
        <DialogAddPlace onClose={togglePlace} />
      </DialogWindow>
    </>
  );
};

const featureInputList = {
  priceFrom: {
    name: 'priceFrom',
    label: 'Цена, от',
    field: 'input',
    type: 'text',
  },
  priceTo: {
    name: 'priceTo',
    label: 'Цена, до',
    field: 'input',
    type: 'text',
  },
  TotalAreaFrom: {
    name: 'TotalAreaFrom',
    label: 'Площадь общая, от',
    field: 'input',
    type: 'number',
  },
  TotalAreaTo: {
    name: 'TotalAreaTo',
    label: 'Площадь общая, до',
    field: 'input',
    type: 'number',
  },
  TotalAreaLandFrom: {
    name: 'TotalAreaLand',
    label: 'Площадь участка, от',
    field: 'input',
    type: 'number',
  },
  TotalAreaLandTo: {
    name: 'TotalAreaLandTo',
    label: 'Площадь участка, до',
    field: 'input',
    type: 'number',
  },
  AvailableFrom: {
    name: 'AvailableFrom',
    label: 'Доступно с',
    field: 'input',
    type: 'date',
  },
  ClassType: {
    name: 'ClassType',
    label: 'Класс здания',
    field: 'select',
    options: [
      {
        name: 'A',
        value: 'a',
      },
      {
        name: 'A+',
        value: 'aPlus',
      },
      {
        name: 'B',
        value: 'b',
      },
      {
        name: 'B-',
        value: 'bMinus',
      },
      {
        name: 'B+',
        value: 'bPlus',
      },
      {
        name: 'C',
        value: 'c',
      },
    ],
  },
  VatType: {
    name: 'VatType',
    label: 'Тип НДС',
    field: 'select',
    options: [
      {
        name: 'Включено',
        value: 'included',
      },
      {
        name: 'Не включено',
        value: 'notIncluded',
      },
      {
        name: 'УСН',
        value: 'usn',
      },
    ],
  },
  ceilingHeight: {
    name: 'ceilingHeight',
    label: 'Высота потолков',
    field: 'input',
    type: 'number',
  },
  WaterPipesCount: {
    name: 'WaterPipesCount',
    label: 'Кол-во мокрых точек',
    field: 'input',
    type: 'number',
  },
};

export default BuyComponent;
