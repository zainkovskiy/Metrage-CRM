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

const FormRoom = () => {
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
        </FormWrapper>
        <FormWrapper>
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
            name='FloorsCount'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Этажей в доме'
                fullWidth
                type='number'
              />
            )}
          />
        </FormWrapper>
        <FormWrapper>
          <Controller
            name='FlatRoomsCount'
            control={control}
            render={({ field }) => (
              <SelectUI
                onChange={field.onChange}
                select={field.value}
                label='Количество комнат'
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
            name='RoomsForSaleCount'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Комнат в продажу'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='TotalArea'
            control={control}
            rules={{ required: 'Поле обязательное' }}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Общая площадь, м2'
                fullWidth
                type='number'
                error={errors?.TotalArea}
              />
            )}
          />
          <Controller
            name='KitchenArea'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Площадь кухни, м2'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='AllRoomsArea'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''}
                label='Площадь комнат, м2'
                fullWidth
                placeholder='Пример: 18+14-10'
              />
            )}
          />
          <Box column gap='0' ai='flex-start' jc='flex-end'>
            <TextSpanStyle color='grey' size={10}>
              + для смежных
            </TextSpanStyle>
            <TextSpanStyle color='grey' size={10}>
              - для раздельных
            </TextSpanStyle>
          </Box>
        </FormWrapper>
        <FormWrapper>
          <Controller
            name='CombinedWcsCount'
            control={control}
            rules={{ min: { value: 0, message: 'Не допустимое значение' } }}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Раздельный санузел'
                fullWidth
                type='number'
                error={errors.CombinedWcsCount}
              />
            )}
          />
          <Controller
            name='SeparateWcsCount'
            control={control}
            rules={{ min: { value: 0, message: 'Не допустимое значение' } }}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Совмещенный санузел'
                fullWidth
                type='number'
                error={errors.CombinedWcsCount}
              />
            )}
          />
        </FormWrapper>
        <FormWrapper>
          <Controller
            name='BalconiesCount'
            control={control}
            rules={{ min: { value: 0, message: 'Не допустимое значение' } }}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Балкон'
                fullWidth
                type='number'
                error={errors.BalconiesCount}
              />
            )}
          />
          <Controller
            name='LoggiasCount'
            control={control}
            rules={{ min: { value: 0, message: 'Не допустимое значение' } }}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Лоджия'
                fullWidth
                type='number'
                error={errors.LoggiasCount}
              />
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Тип комнат</TextSpanStyle>
          <Controller
            control={control}
            name='RoomType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='combined'
                  active={field.value}
                >
                  Совмещенная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='separate'
                  active={field.value}
                >
                  Изолированная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='both'
                  active={field.value}
                >
                  Оба варианта
                </ButtonToggleItem>
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
          <TextSpanStyle>Вид из окна</TextSpanStyle>
          <Controller
            control={control}
            name='WindowsViewType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='street'
                  active={field.value}
                >
                  На улицу
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='yard'
                  active={field.value}
                >
                  Во двор
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='yardAndStreet'
                  active={field.value}
                >
                  На улицу и двор
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <Controller
            control={control}
            name='MortgageAllowed'
            render={({ field }) => (
              <CheckboxUI
                label='Ипотека'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='MortgageAllowed'
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

export default FormRoom;
