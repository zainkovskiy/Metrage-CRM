import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { device } from 'styles/device';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import {
  getNewBuilderList,
  getObjectList,
  getBidList,
  createDeal,
} from 'api/dealAPI';
import { useNumberTriad } from 'hooks/StringHook';
import { useDispatch } from 'react-redux';
import { addNewDeal } from '../../../store/dealSlice';
import { getDeveloperlList } from '../../../api/search';

const NewDealStyle = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const FormGridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
const NewDeal = ({ onClose }) => {
  const [newBuilderList, setNewBuilderList] = useState([]);
  const [newBuilderLoading, setNewBuilderLoading] = useState(false);
  const [bidList, setBidList] = useState([]);
  const [bidLoading, setBidLoading] = useState(false);
  const [objectList, setObjectList] = useState([]);
  const [objectListLoading, setObjectListLoading] = useState(false);
  const [developerList, setDeveloperList] = useState([]);
  const developerRequest = useRef(false);
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dealType: 'simple',
      realtyType: 'live',
      isSuburban: false,
    },
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    createDeal(data).then((answer) => {
      if (answer?.result === 'OK') {
        dispatch(addNewDeal(answer?.UID));
        onClose();
      }
    });
  };
  const getNewBuilder = (value) => {
    if (value.length < 2) {
      return;
    }
    if (newBuilderLoading) {
      return;
    }
    setNewBuilderLoading(true);
    getNewBuilderList({
      requet: value,
      isSuburban: getValues('isSuburban'),
    })
      .then((data) => {
        setNewBuilderList(data);
      })
      .finally(() => {
        setNewBuilderLoading(false);
      });
  };
  const getBids = (value) => {
    if (value.length < 2) {
      return;
    }
    if (bidLoading) {
      return;
    }
    setBidLoading(true);
    getBidList(value)
      .then((data) => {
        setBidList(data);
      })
      .finally(() => {
        setBidLoading(false);
      });
  };
  const getObjects = (value) => {
    if (value.length < 2) {
      return;
    }
    if (objectListLoading) {
      return;
    }
    setObjectListLoading(true);
    getObjectList(value, 'live')
      .then((data) => {
        setObjectList(data);
      })
      .finally(() => {
        setObjectListLoading(false);
      });
  };
  const getDevelopers = (value) => {
    if (value.length < 2) {
      setDeveloperList([]);
      return;
    }
    if (developerRequest.current) {
      return;
    }
    developerRequest.current = true;
    getDeveloperlList(value)
      .then((data) => {
        setDeveloperList(data);
      })
      .finally(() => {
        developerRequest.current = false;
      });
  };
  watch('dealType');
  watch('advertising');
  watch('isSuburban');
  return (
    <NewDealStyle onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Box column fullWidth gap='0.2rem' ai='flex-start'>
          <TextSpanStyle>Тип сделки *</TextSpanStyle>
          <Controller
            control={control}
            name='dealType'
            rules={{ required: true }}
            render={({ field }) => (
              <ButtonToggleGroup fullWidth>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='simple'
                  active={field.value}
                >
                  Обычная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='developer'
                  active={field.value}
                >
                  От застройщика
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
          {getValues('dealType') === 'simple' && (
            <Box column fullWidth gap='0.2rem' ai='flex-start'>
              <TextSpanStyle>Тип недвижимости *</TextSpanStyle>
              <Controller
                control={control}
                name='realtyType'
                rules={{ required: true }}
                render={({ field }) => (
                  <ButtonToggleGroup fullWidth>
                    <ButtonToggleItem
                      onClick={(e) => field.onChange(e.target.id)}
                      id='live'
                      active={field.value}
                    >
                      Жилая
                    </ButtonToggleItem>
                    <ButtonToggleItem
                      onClick={(e) => field.onChange(e.target.id)}
                      id='bussiness'
                      active={field.value}
                    >
                      Коммерческая
                    </ButtonToggleItem>
                  </ButtonToggleGroup>
                )}
              />
            </Box>
          )}
          {getValues('dealType') === 'developer' && (
            <Box column fullWidth gap='0.2rem' ai='flex-start'>
              <TextSpanStyle></TextSpanStyle>
              <Controller
                control={control}
                name='isSuburban'
                // rules={{ required: true }}
                render={({ field }) => (
                  <ButtonToggleGroup fullWidth>
                    <ButtonToggleItem
                      onClick={(e) => field.onChange(false)}
                      id='false'
                      active={field.value.toString()}
                    >
                      Объект в ЖК
                    </ButtonToggleItem>
                    <ButtonToggleItem
                      onClick={(e) => field.onChange(true)}
                      id='true'
                      active={field.value.toString()}
                    >
                      Объект в КП
                    </ButtonToggleItem>
                  </ButtonToggleGroup>
                )}
              />
            </Box>
          )}
        </Box>
        <FormGridStyle>
          <Controller
            control={control}
            name='plannedDate'
            rules={{ required: { value: true, message: 'Поле обязательно' } }}
            render={({ field }) => (
              <InputUI
                type='date'
                small
                value={field.value || ''}
                onChange={field.onChange}
                label='Дата сделки (План) *'
                error={errors?.plannedDate}
              />
            )}
          />
          <Controller
            name='objectId'
            control={control}
            rules={{
              required: {
                value: getValues('dealType') === 'simple',
                message: 'Поле обязательно',
              },
            }}
            render={({ field }) => (
              <SelectAutoсompleteUI
                label={`Объект ${
                  getValues('dealType') === 'simple' ? '*' : ''
                }`}
                inputChange={getObjects}
                options={objectList}
                loading={objectListLoading}
                getOptionsLabel={(options) =>
                  `${options.street || ''} ${options.house || ''}`
                }
                onChange={(option) => field.onChange(option)}
                value={field.value}
                small
                error={errors?.objectId}
              />
            )}
          />
          <Controller
            name='bidId'
            control={control}
            rules={{
              required: {
                value: getValues('dealType') === 'simple',
                message: 'Поле обязательно',
              },
            }}
            render={({ field }) => (
              <SelectAutoсompleteUI
                label={`Заявка покупателя ${
                  getValues('dealType') === 'simple' ? '*' : ''
                }`}
                inputChange={getBids}
                options={bidList}
                loading={bidLoading}
                getOptionsLabel={(options) =>
                  `${options.lastName || ''} ${options.firstName || ''} ${
                    options.secondName || ''
                  }`
                }
                getOptionsSubtitle={(options) => options.stage || ''}
                onChange={(option) => field.onChange(option)}
                value={field.value}
                small
                error={errors?.bidId}
              />
            )}
          />
          {getValues('dealType') === 'simple' && (
            <>
              <Box column fullWidth gap='0.2rem' ai='flex-start'>
                <TextSpanStyle>Оставить в рекламе</TextSpanStyle>
                <Controller
                  control={control}
                  name='advertising'
                  render={({ field }) => (
                    <ButtonToggleGroup fullWidth>
                      <ButtonToggleItem
                        onClick={(e) => field.onChange(true)}
                        id='yes'
                        active={field.value === true && 'yes'}
                      >
                        Да
                      </ButtonToggleItem>
                      <ButtonToggleItem
                        onClick={(e) => field.onChange(false)}
                        id='no'
                        active={field.value === false && 'no'}
                      >
                        Нет
                      </ButtonToggleItem>
                    </ButtonToggleGroup>
                  )}
                />
              </Box>
              <Controller
                control={control}
                name='onDomclick'
                render={({ field }) => (
                  <CheckboxUI
                    disabled={!getValues('advertising')}
                    label='Рекламировать на Домклик'
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                    }}
                    defaultChecked={field.value || false}
                    id='hasDomclick'
                  />
                )}
              />
            </>
          )}
          {getValues('dealType') === 'simple' && (
            <Controller
              control={control}
              name='isRent'
              render={({ field }) => (
                <CheckboxUI
                  label='Аренда'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='isRent'
                />
              )}
            />
          )}
          {getValues('dealType') === 'developer' && (
            <>
              <Controller
                name='newbId'
                control={control}
                rules={{
                  required: { value: true, message: 'Поле обязательно' },
                }}
                render={({ field }) => (
                  <SelectAutoсompleteUI
                    label='Новостройка *'
                    inputChange={getNewBuilder}
                    options={newBuilderList}
                    loading={newBuilderLoading}
                    getOptionsLabel={(options) => options.resName}
                    getOptionsSubtitle={(options) => options.addrString}
                    onChange={(option) => field.onChange(option)}
                    value={field.value}
                    small
                    error={errors?.newbId}
                  />
                )}
              />
              <Controller
                control={control}
                name='Appartment'
                rules={{
                  required: { value: true, message: 'Поле обязательно' },
                }}
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    label='Номер квартиры *'
                    error={errors?.Appartment}
                    type='number'
                  />
                )}
              />
              <Controller
                name='FlatRoomsCount'
                control={control}
                rules={{
                  required: { value: true, message: 'Поле обязательно' },
                }}
                render={({ field }) => (
                  <SelectUI
                    onChange={field.onChange}
                    select={field.value}
                    label='Комнатность *'
                    small
                    error={errors?.FlatRoomsCount}
                  >
                    <SelectItemUI value={1}>1-комнатная</SelectItemUI>
                    <SelectItemUI value={2}>2-комнатная</SelectItemUI>
                    <SelectItemUI value={3}>3-комнатная</SelectItemUI>
                    <SelectItemUI value={4}>4-комнатная</SelectItemUI>
                    <SelectItemUI value={5}>5-комнатная</SelectItemUI>
                    <SelectItemUI value={6}>6+</SelectItemUI>
                    <SelectItemUI value={7}>Свободная планировка</SelectItemUI>
                    <SelectItemUI value={9}>Студия</SelectItemUI>
                  </SelectUI>
                )}
              />
              <Controller
                control={control}
                name='TotalArea'
                rules={{
                  required: { value: true, message: 'Поле обязательно' },
                }}
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    label='Площадь *'
                    error={errors?.TotalArea}
                    type='number'
                  />
                )}
              />
              <Controller
                control={control}
                name='Price'
                rules={{
                  required: { value: true, message: 'Поле обязательно' },
                }}
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value ? useNumberTriad(field.value) : ''}
                    onChange={(e) => {
                      field.onChange(
                        parseInt(e.target.value.split(' ').join(''))
                      );
                    }}
                    label='Цена объекта *'
                    error={errors?.Price}
                  />
                )}
              />
              <Controller
                control={control}
                name='newManager'
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value || ''}
                    onChange={field.onChange}
                    label='Менедежер застройщика'
                  />
                )}
              />
              {getValues('isSuburban') && (
                <Controller
                  name='developer'
                  control={control}
                  render={({ field }) => (
                    <SelectAutoсompleteUI
                      label='Застройщик'
                      options={developerList}
                      getOptionsLabel={(options) => options.devName}
                      onChange={(option) => field.onChange(option)}
                      value={field.value || ''}
                      inputChange={getDevelopers}
                      small
                    />
                  )}
                />
              )}
            </>
          )}
        </FormGridStyle>
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewDealStyle>
  );
};

export default NewDeal;
