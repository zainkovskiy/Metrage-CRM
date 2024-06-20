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
import { getBusinessBuildingTypes, getBusinessСenters } from 'api/objectAPI';
import { useNumberTriad } from 'hooks/StringHook';
import { useAsyncValue } from 'react-router-dom';

const FormOffice = () => {
  const obj = useAsyncValue();
  const { control } = useFormContext();
  const { errors } = useFormState();
  const [buildingTypes, setBuildingTypes] = useState([]);
  const [businessСenters, setBusinessСenters] = useState([]);
  const [businessLoading, setBusinessLoading] = useState(false);
  useEffect(() => {
    requestBusinessBuildingTypes();
  }, []);

  const requestBusinessBuildingTypes = async () => {
    const data = await getBusinessBuildingTypes();
    setBuildingTypes(data);
  };
  const handleChangeBusinessCenters = async (value) => {
    if (businessLoading) {
      return;
    }
    setBusinessLoading(true);
    try {
      const res = await getBusinessСenters(value);
      setBusinessСenters(res);
    } catch (error) {
      console.log(error);
    } finally {
      setBusinessLoading(false);
    }
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
            name='BuildingFloorsCount'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Этажей в здании'
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
            name='LandArea'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value || ''}
                label='Площадь участка. в сотках'
                fullWidth
                type='number'
              />
            )}
          />
          <Controller
            name='BuildingType'
            control={control}
            render={({ field }) => (
              <SelectAutoсompleteUI
                label='Тип здания'
                options={buildingTypes}
                getOptionsLabel={(options) => options.type}
                onChange={(option) => field.onChange(option)}
                value={field.value}
              />
            )}
          />
          <Controller
            name='BusinessShoppingCenterId'
            control={control}
            render={({ field }) => (
              <SelectAutoсompleteUI
                label='ТЦ/БЦ'
                options={businessСenters}
                loading={businessLoading}
                getOptionsLabel={(options) => options.bcName}
                getOptionsSubtitle={(options) => options.bcAddress}
                inputChange={handleChangeBusinessCenters}
                onChange={(option) => field.onChange(option)}
                value={field.value}
              />
            )}
          />
          <Controller
            name='WaterPipesCount'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                value={field.value || ''}
                label='Количество мокрых точек'
                fullWidth
                type='number'
              />
            )}
          />
          {obj && (
            <Controller
              name='ceilingHeight'
              control={control}
              render={({ field }) => (
                <InputUI
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value || ''}
                  label='Высота потолков'
                  fullWidth
                  type='number'
                />
              )}
            />
          )}
          <Controller
            name='AvailableFrom'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''}
                label='Дата освобождения'
                fullWidth
                type='date'
              />
            )}
          />
        </FormWrapper>
        <Box column ai='flex-start'>
          <TextSpanStyle>Класс здания</TextSpanStyle>
          <Controller
            control={control}
            name='TypeClassType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='a'
                  active={field.value}
                >
                  A
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='aPlus'
                  active={field.value}
                >
                  A+
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='b'
                  active={field.value}
                >
                  B
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='bMinus'
                  active={field.value}
                >
                  B-
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='bPlus'
                  active={field.value}
                >
                  B+
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='c'
                  active={field.value}
                >
                  C
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Планировка</TextSpanStyle>
          <Controller
            control={control}
            name='Layout'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='cabinet'
                  active={field.value}
                >
                  Кабинетная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='corridorplan'
                  active={field.value}
                >
                  Коридорная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='mixed'
                  active={field.value}
                >
                  Смешанная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='openSpace'
                  active={field.value}
                >
                  Открытая
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Состояние</TextSpanStyle>
          <Controller
            control={control}
            name='ConditionType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='cosmeticRepairsRequired'
                  active={field.value}
                >
                  Требуется косметический ремонт
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='finishing'
                  active={field.value}
                >
                  Под чистовую отделку
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='majorRepairsRequired'
                  active={field.value}
                >
                  Требуется капитальный ремонт
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='office'
                  active={field.value}
                >
                  Офисная отделка
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='design'
                  active={field.value}
                >
                  Дизайнерский ремонт
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='typical'
                  active={field.value}
                >
                  Типовой ремонт
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Категория здания</TextSpanStyle>
          <Controller
            control={control}
            name='BuildingStatusType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='operational'
                  active={field.value}
                >
                  Действующее
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='project'
                  active={field.value}
                >
                  Проект
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='underConstruction'
                  active={field.value}
                >
                  Строящееся
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Вентиляция</TextSpanStyle>
          <Controller
            control={control}
            name='BuildingVentilationType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='forced'
                  active={field.value}
                >
                  Приточная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='natural'
                  active={field.value}
                >
                  Естественная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Нет
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Кондиционирование</TextSpanStyle>
          <Controller
            control={control}
            name='BuildingConditioningType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='central'
                  active={field.value}
                >
                  Центральное
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='local'
                  active={field.value}
                >
                  Местное
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Нет
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Система пожаротушения</TextSpanStyle>
          <Controller
            control={control}
            name='BuildingExtinguishingSystemType'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='alarm'
                  active={field.value}
                >
                  Сигнализация
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='gas'
                  active={field.value}
                >
                  Газовая
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='hydrant'
                  active={field.value}
                >
                  Гидрантная
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Нет
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='powder'
                  active={field.value}
                >
                  Порошковая
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='sprinkler'
                  active={field.value}
                >
                  Спринклерная
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Лифт</TextSpanStyle>
          <Controller
            control={control}
            name='BuildingLiftTypes'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Нет
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='cargo'
                  active={field.value}
                >
                  Грузовой
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='escalator'
                  active={field.value}
                >
                  Эскалатор
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='lift'
                  active={field.value}
                >
                  Лифт
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='passenger'
                  active={field.value}
                >
                  Пассажирский
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='telpher'
                  active={field.value}
                >
                  Тельфер
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='travelator'
                  active={field.value}
                >
                  Траволатор
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        <Box column ai='flex-start'>
          <TextSpanStyle>Мебель</TextSpanStyle>
          <Controller
            control={control}
            name='FurniturePresence'
            render={({ field }) => (
              <ButtonToggleGroup type='apart'>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='yes'
                  active={field.value}
                >
                  Есть
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='no'
                  active={field.value}
                >
                  Нет
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
        </Box>
        {obj && (
          <Box column ai='flex-start'>
            <TextSpanStyle>Стиль "Лофт"</TextSpanStyle>
            <Controller
              control={control}
              name='isLoft'
              render={({ field }) => (
                <ButtonToggleGroup type='apart'>
                  <ButtonToggleItem
                    onClick={(e) => field.onChange(e.target.id)}
                    id='yes'
                    active={field.value}
                  >
                    Да
                  </ButtonToggleItem>
                  <ButtonToggleItem
                    onClick={(e) => field.onChange(e.target.id)}
                    id='no'
                    active={field.value}
                  >
                    Нет
                  </ButtonToggleItem>
                </ButtonToggleGroup>
              )}
            />
          </Box>
        )}
        <TextSpanStyle bold color='#575757'>
          Инфраструктура рядом
        </TextSpanStyle>
        <Box ai='flex-start'>
          <Box fullWidth column ai='flex-start'>
            <Controller
              control={control}
              name='InfrastructureHasCarWash'
              render={({ field }) => (
                <CheckboxUI
                  label='Автомойка'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCarWash'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasCarService'
              render={({ field }) => (
                <CheckboxUI
                  label='Автосервис'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCarService'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasPharmacy'
              render={({ field }) => (
                <CheckboxUI
                  label='Аптека'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasPharmacy'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasClothesStudio'
              render={({ field }) => (
                <CheckboxUI
                  label='Ателье одежды'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasClothesStudio'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasAtm'
              render={({ field }) => (
                <CheckboxUI
                  label='Банкомат'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasAtm'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasPool'
              render={({ field }) => (
                <CheckboxUI
                  label='Бассейн'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasPool'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasBuffet'
              render={({ field }) => (
                <CheckboxUI
                  label='Буфет'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasBuffet'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasExhibitionAndWarehouseComplex'
              render={({ field }) => (
                <CheckboxUI
                  label='Выставочно-складской комплекс'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasExhibitionAndWarehouseComplex'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasHotel'
              render={({ field }) => (
                <CheckboxUI
                  label='Гостиница'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasHotel'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasCafe'
              render={({ field }) => (
                <CheckboxUI
                  label='Кафе'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCafe'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasCinema'
              render={({ field }) => (
                <CheckboxUI
                  label='Кинотеатр'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCinema'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasConferenceRoom'
              render={({ field }) => (
                <CheckboxUI
                  label='Конференц-зал'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasConferenceRoom'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasMedicalCenter'
              render={({ field }) => (
                <CheckboxUI
                  label='Медицинский центр'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasMedicalCenter'
                />
              )}
            />
          </Box>
          <Box fullWidth column ai='flex-start'>
            <Controller
              control={control}
              name='InfrastructureHasMinimarket'
              render={({ field }) => (
                <CheckboxUI
                  label='Минимаркет'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasMinimarket'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasNotaryOffice'
              render={({ field }) => (
                <CheckboxUI
                  label='Нотариальная контора'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasNotaryOffice'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasBankDepartmet'
              render={({ field }) => (
                <CheckboxUI
                  label='Отделение банка'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasBankDepartmet'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasPark'
              render={({ field }) => (
                <CheckboxUI
                  label='Парк'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasPark'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasRestaurant'
              render={({ field }) => (
                <CheckboxUI
                  label='Ресторан'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasRestaurant'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasBeautyShop'
              render={({ field }) => (
                <CheckboxUI
                  label='Салон красоты'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasBeautyShop'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasWarehouse'
              render={({ field }) => (
                <CheckboxUI
                  label='Складские помещения'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasWarehouse'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasCanteen'
              render={({ field }) => (
                <CheckboxUI
                  label='Столовая'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCanteen'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasSupermarket'
              render={({ field }) => (
                <CheckboxUI
                  label='Супермаркет'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasSupermarket'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasShoppingArea'
              render={({ field }) => (
                <CheckboxUI
                  label='Торговая зона'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasShoppingArea'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasFitnessCentre'
              render={({ field }) => (
                <CheckboxUI
                  label='Фитнес-центр'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasFitnessCentre'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasStudio'
              render={({ field }) => (
                <CheckboxUI
                  label='Фотосалон'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasStudio'
                />
              )}
            />
            <Controller
              control={control}
              name='InfrastructureHasCentralReception'
              render={({ field }) => (
                <CheckboxUI
                  label='Центральная рецепция'
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  defaultChecked={field.value || false}
                  id='InfrastructureHasCentralReception'
                />
              )}
            />
          </Box>
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

export default FormOffice;
