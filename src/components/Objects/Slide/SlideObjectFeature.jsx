import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { SlideBlockStyle } from '../ObjectsStyle';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import editUrl, { ReactComponent as Edit } from 'images/edit.svg';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogComment from './SlideDialogComment';
import { setDescriptionAPI } from 'api/objectAPI';
import exclamationUrl, {
  ReactComponent as Exclamation,
} from 'images/exclamation.svg';
import { device } from 'styles/device';
import {
  RoomTypeTranslate,
  RepairTypeTranslate,
  WindowsViewTypeTranslate,
  AgentBonusPaymentTypeTranslate,
  FlatRoomsCountTranslate,
  // RoomsForSaleCountTranslate,
  DecorationTranslate,
  CplModerationPersonTypeTranslate,
  SaleTypeTranslate,
  GarageTypeTranslate,
  GarageTypeTypeTranslate,
  PermittedLandUseTypeTranslate,
  MaterialTypesMaterialTypeTranslate,
  HouseConditionTranslate,
  WaterSuburbanWaterTypeTranslate,
  DrainageTypeTranslate,
  GasTypeTranslate,
  WcLocationTypeTranslate,
  LayoutTranslate,
  ConditionTypeTranslate,
  BuildingStatusTypeTranslate,
  BuildingVentilationTypeTranslate,
  BuildingConditioningTypeTranslate,
  BuildingExtinguishingSystemTypeTranslate,
  BuildingLiftTypesTranslate,
  FurniturePresenceTranslate,
  InputTypeTranslate,
  WorkingDaysTypeTranslate,
  ReadyBusinessTypeTranslate,
  EstateTypeTranslate,
  LandStatusTranslate,
  PermittedUseTypeTranslate,
  СonveniencesTranslate,
} from '../KeyTranslate';
import { SliderTitle } from '../../../styles/slider';
const AlertIcon = styled(Exclamation)`
  width: 20px;
  height: 20px;
`;
const FeatureContainer = styled(SlideBlockStyle)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
const FeatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const FeatureLine = styled.div``;
const FeatureProp = styled(TextSpanStyle)`
  position: relative;
  display: block;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    margin-left: 0.3rem;
    bottom: 0.35em;
    width: 100%;
    border-bottom: 0.1em dotted;
  }
`;
const FeatureValue = styled(TextSpanStyle)`
  float: right;
  padding-left: 0.3rem;
`;

const SlideObjectFeature = () => {
  const object = useAsyncValue();
  const [isEditComment, setIsEditComment] = useState(false);
  const toggleEditComment = () => {
    setIsEditComment(!isEditComment);
  };
  const setNewDescription = (form) => {
    object.Description = form.Description;
    setDescriptionAPI({
      ...form,
      UID: object.UID,
      type: object.typeEstate,
    });
  };
  return (
    <>
      <FeatureContainer ai='flex-start'>
        <FeatureBlock>
          <SliderTitle>Характеристики</SliderTitle>
          <FeatureBlock>
            {object?.Apartment && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.Apartment}</FeatureValue>
                <FeatureProp size={10}>Номер квартиры</FeatureProp>
              </FeatureLine>
            )}
            {object?.ReadyBusinessType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {ReadyBusinessTypeTranslate[object?.ReadyBusinessType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип бизнеса</FeatureProp>
              </FeatureLine>
            )}
            {object?.MonthlyIncome && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.MonthlyIncome}</FeatureValue>
                <FeatureProp size={10}>Месячная прибыль</FeatureProp>
              </FeatureLine>
            )}
            {object?.EstateType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {EstateTypeTranslate[object?.EstateType]}
                </FeatureValue>
                <FeatureProp size={10}>Статус недвижимости</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingCadastralNumber && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.BuildingCadastralNumber}
                </FeatureValue>
                <FeatureProp size={10}>Кадастровый номер</FeatureProp>
              </FeatureLine>
            )}
            {object?.LandCadastralNumber && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.LandCadastralNumber}
                </FeatureValue>
                <FeatureProp size={10}>Кадастровый номер земли</FeatureProp>
              </FeatureLine>
            )}
            {object?.FlatRoomsCount && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {FlatRoomsCountTranslate[object?.FlatRoomsCount]}
                </FeatureValue>
                <FeatureProp size={10}>Количество комнат</FeatureProp>
              </FeatureLine>
            )}
            {object?.RoomsForSaleCount && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.RoomsForSaleCount}
                </FeatureValue>
                <FeatureProp size={10}>Комнат в продажу</FeatureProp>
              </FeatureLine>
            )}
            {object?.KitchenArea && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.KitchenArea}</FeatureValue>
                <FeatureProp size={10}>Площадь кухни</FeatureProp>
              </FeatureLine>
            )}
            {object?.LandArea && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.LandArea}</FeatureValue>
                <FeatureProp size={10}>Площадь участка</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingTotalArea && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.BuildingTotalArea}
                </FeatureValue>
                <FeatureProp size={10}>Общая площадь здания</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.BuildingType?.type}
                </FeatureValue>
                <FeatureProp size={10}>Тип здания</FeatureProp>
              </FeatureLine>
            )}
            {object?.SpecialtyTypes && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.SpecialtyTypes?.specialtyType}
                </FeatureValue>
                <FeatureProp size={10}>Возможное назначение</FeatureProp>
              </FeatureLine>
            )}
            {object?.BusinessShoppingCenterId && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.BusinessShoppingCenterId?.bcName}
                </FeatureValue>
                <FeatureProp size={10}>ТЦ/БЦ</FeatureProp>
              </FeatureLine>
            )}
            {object?.WaterPipesCount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.WaterPipesCount}</FeatureValue>
                <FeatureProp size={10}>Количество мокрых точек</FeatureProp>
              </FeatureLine>
            )}
            {object?.AvailableFrom && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.AvailableFrom}</FeatureValue>
                <FeatureProp size={10}>Дата освобождения</FeatureProp>
              </FeatureLine>
            )}
            {object?.BedroomsCount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.BedroomsCount}</FeatureValue>
                <FeatureProp size={10}>Количество спален</FeatureProp>
              </FeatureLine>
            )}
            {object?.WcsCount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.WcsCount}</FeatureValue>
                <FeatureProp size={10}>Количество санузлов</FeatureProp>
              </FeatureLine>
            )}
            {object?.ShareAmount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.ShareAmount}</FeatureValue>
                <FeatureProp size={10}>Размер доли</FeatureProp>
              </FeatureLine>
            )}
            {object?.LandStatus && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {LandStatusTranslate[object?.LandStatus]}
                </FeatureValue>
                <FeatureProp size={10}>Статус земли</FeatureProp>
              </FeatureLine>
            )}
            {object?.PermittedUseType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {PermittedUseTypeTranslate[object?.PermittedUseType]}
                </FeatureValue>
                <FeatureProp size={10}>
                  Вид разрешённого использования
                </FeatureProp>
              </FeatureLine>
            )}
            {object?.Layout && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {LayoutTranslate[object?.Layout]}
                </FeatureValue>
                <FeatureProp size={10}>Планировка</FeatureProp>
              </FeatureLine>
            )}
            {object?.ConditionType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {ConditionTypeTranslate[object?.ConditionType]}
                </FeatureValue>
                <FeatureProp size={10}>Состояние</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingStatusType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {BuildingStatusTypeTranslate[object?.BuildingStatusType]}
                </FeatureValue>
                <FeatureProp size={10}>Категория здания</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingVentilationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    BuildingVentilationTypeTranslate[
                      object?.BuildingVentilationType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Вентиляция</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingConditioningType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    BuildingConditioningTypeTranslate[
                      object?.BuildingConditioningType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Кондиционирование</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingExtinguishingSystemType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    BuildingExtinguishingSystemTypeTranslate[
                      object?.BuildingExtinguishingSystemType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Система пожаротушения</FeatureProp>
              </FeatureLine>
            )}
            {object?.InputType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {InputTypeTranslate[object?.InputType]}
                </FeatureValue>
                <FeatureProp size={10}>Входная группа</FeatureProp>
              </FeatureLine>
            )}
            {object?.BuildingLiftTypes && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {BuildingLiftTypesTranslate[object?.BuildingLiftTypes]}
                </FeatureValue>
                <FeatureProp size={10}>Лифт</FeatureProp>
              </FeatureLine>
            )}
            {object?.FurniturePresence && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {FurniturePresenceTranslate[object?.FurniturePresence]}
                </FeatureValue>
                <FeatureProp size={10}>Мебель</FeatureProp>
              </FeatureLine>
            )}
            {object?.WorkingDaysType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {WorkingDaysTypeTranslate[object?.WorkingDaysType]}
                </FeatureValue>
                <FeatureProp size={10}>Рабочие дни</FeatureProp>
              </FeatureLine>
            )}
            {object?.GarageType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {GarageTypeTranslate[object?.GarageType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип гаража</FeatureProp>
              </FeatureLine>
            )}
            {object?.GarageTypeType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {GarageTypeTypeTranslate[object?.GarageTypeType]}
                </FeatureValue>
                <FeatureProp size={10}>Подтип гаража</FeatureProp>
              </FeatureLine>
            )}
            {object?.CombinedWcsCount && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.CombinedWcsCount}
                </FeatureValue>
                <FeatureProp size={10}>Раздельный санузел</FeatureProp>
              </FeatureLine>
            )}
            {object?.SeparateWcsCount && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.SeparateWcsCount}
                </FeatureValue>
                <FeatureProp size={10}>Совмещенный санузел</FeatureProp>
              </FeatureLine>
            )}
            {object?.BalconiesCount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.BalconiesCount}</FeatureValue>
                <FeatureProp size={10}>Балкон</FeatureProp>
              </FeatureLine>
            )}
            {object?.LoggiasCount && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.LoggiasCount}</FeatureValue>
                <FeatureProp size={10}>Лоджия</FeatureProp>
              </FeatureLine>
            )}
            {object?.PermittedLandUseType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {PermittedLandUseTypeTranslate[object?.PermittedLandUseType]}
                </FeatureValue>
                <FeatureProp size={10}>Вид земельного участка</FeatureProp>
              </FeatureLine>
            )}
            {object?.MaterialTypesMaterialType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    MaterialTypesMaterialTypeTranslate[
                      object?.MaterialTypesMaterialType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Материал дома</FeatureProp>
              </FeatureLine>
            )}
            {object?.HouseCondition && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {HouseConditionTranslate[object?.HouseCondition]}
                </FeatureValue>
                <FeatureProp size={10}>Состояние дома</FeatureProp>
              </FeatureLine>
            )}
            {object?.WaterSuburbanWaterType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    WaterSuburbanWaterTypeTranslate[
                      object?.WaterSuburbanWaterType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Тип водоснабжения</FeatureProp>
              </FeatureLine>
            )}
            {object?.DrainageType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {DrainageTypeTranslate[object?.DrainageType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип канализации</FeatureProp>
              </FeatureLine>
            )}
            {object?.GasType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {GasTypeTranslate[object?.GasType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип газа</FeatureProp>
              </FeatureLine>
            )}
            {object?.WcLocationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {WcLocationTypeTranslate[object?.WcLocationType]}
                </FeatureValue>
                <FeatureProp size={10}>Санузел</FeatureProp>
              </FeatureLine>
            )}
            {object?.ElectricityLocationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {СonveniencesTranslate[object?.ElectricityLocationType]}
                </FeatureValue>
                <FeatureProp size={10}>Электричество</FeatureProp>
              </FeatureLine>
            )}
            {object?.GasLocationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {СonveniencesTranslate[object?.GasLocationType]}
                </FeatureValue>
                <FeatureProp size={10}>Газ</FeatureProp>
              </FeatureLine>
            )}
            {object?.DrainageLocationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {СonveniencesTranslate[object?.DrainageLocationType]}
                </FeatureValue>
                <FeatureProp size={10}>Канализация</FeatureProp>
              </FeatureLine>
            )}
            {object?.WaterLocationType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {СonveniencesTranslate[object?.WaterLocationType]}
                </FeatureValue>
                <FeatureProp size={10}>Водоснабжение</FeatureProp>
              </FeatureLine>
            )}
            {object?.RoomType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {RoomTypeTranslate[object?.RoomType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип комнат</FeatureProp>
              </FeatureLine>
            )}
            {object?.RepairType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {RepairTypeTranslate[object?.RepairType]}
                </FeatureValue>
                <FeatureProp size={10}>Ремонт</FeatureProp>
              </FeatureLine>
            )}
            {object?.Decoration && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {DecorationTranslate[object?.Decoration]}
                </FeatureValue>
                <FeatureProp size={10}>Отделка</FeatureProp>
              </FeatureLine>
            )}
            {object?.WindowsViewType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {WindowsViewTypeTranslate[object?.WindowsViewType]}
                </FeatureValue>
                <FeatureProp size={10}>Вид из окна</FeatureProp>
              </FeatureLine>
            )}
            {object?.IsApartments && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.IsApartments ? 'Да' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Апартаменты</FeatureProp>
              </FeatureLine>
            )}
            {object?.IsDacha && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.IsDacha ? 'Да' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Дача</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasEquipment && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasEquipment ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Оборудование</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCarWash && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCarWash ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Автомойка</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCarService && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCarService ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Автосервис</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasPharmacy && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasPharmacy ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Аптека</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasClothesStudio && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasClothesStudio ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Ателье одежды</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasAtm && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasAtm ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Банкомат</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasPool && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasPool ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Бассейн</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasBuffet && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasBuffet ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Буфет</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasExhibitionAndWarehouseComplex && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasExhibitionAndWarehouseComplex
                    ? 'Есть'
                    : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>
                  Выставочно-складской комплекс
                </FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasHotel && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasHotel ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Гостиница</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCafe && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCafe ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Кафе</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCinema && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCinema ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Кинотеатр</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasConferenceRoom && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasConferenceRoom ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Конференц-зал</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasFurniture && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasFurniture ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Мебель в комнатах</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasMedicalCenter && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasMedicalCenter ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Медицинский центр</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasMinimarket && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasMinimarket ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Минимаркет</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasNotaryOffice && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasNotaryOffice ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Нотариальная контора</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasBankDepartmet && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasBankDepartmet ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Отделение банка</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasPark && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasPark ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Парк</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasRestaurant && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasRestaurant ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Ресторан</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasBeautyShop && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasBeautyShop ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Салон красоты</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasWarehouse && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasWarehouse ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Складские помещения</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCanteen && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCanteen ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Столовая</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasSupermarket && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasSupermarket ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Супермаркет</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasShoppingArea && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasShoppingArea ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Торговая зона</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasFitnessCentre && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasFitnessCentre ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Фитнес-центр</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasStudio && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasStudio ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Фотосалон</FeatureProp>
              </FeatureLine>
            )}
            {object?.InfrastructureHasCentralReception && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.InfrastructureHasCentralReception ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Центральная рецепция</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasElectricity && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasElectricity ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Электричество</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasWater && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasWater ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Вода</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasGas && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasGas ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Газ</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasDrainage && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasDrainage ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Канализация</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasSecurity && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasSecurity ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Охрана</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasBathhouse && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasBathhouse ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Есть баня</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasGarage && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasGarage ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Есть гараж</FeatureProp>
              </FeatureLine>
            )}
            {object?.HasPool && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HasPool ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Есть бассейн</FeatureProp>
              </FeatureLine>
            )}
            {object?.HouseHasTerrace && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HouseHasTerrace ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Есть терасса</FeatureProp>
              </FeatureLine>
            )}
            {object?.HouseHasCellar && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.HouseHasCellar ? 'Есть' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Есть погреб</FeatureProp>
              </FeatureLine>
            )}
            {object?.MortgageAllowed && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {object?.MortgageAllowed ? 'Да' : 'Нет'}
                </FeatureValue>
                <FeatureProp size={10}>Ипотека</FeatureProp>
              </FeatureLine>
            )}
            {object?.CplModerationPersonType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    CplModerationPersonTypeTranslate[
                      object?.CplModerationPersonType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Данные дольщика</FeatureProp>
              </FeatureLine>
            )}
            {object?.SaleType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {SaleTypeTranslate[object?.SaleType]}
                </FeatureValue>
                <FeatureProp size={10}>Тип продажи</FeatureProp>
              </FeatureLine>
            )}
            {object?.AgentBonusValue && (
              <FeatureLine>
                <FeatureValue size={10}>{object?.AgentBonusValue}</FeatureValue>
                <FeatureProp size={10}>Бонус агенту</FeatureProp>
              </FeatureLine>
            )}
            {object?.AgentBonusPaymentType && (
              <FeatureLine>
                <FeatureValue size={10}>
                  {
                    AgentBonusPaymentTypeTranslate[
                      object?.AgentBonusPaymentType
                    ]
                  }
                </FeatureValue>
                <FeatureProp size={10}>Тип оплаты агенту</FeatureProp>
              </FeatureLine>
            )}
          </FeatureBlock>
        </FeatureBlock>
        <FeatureBlock>
          <SliderTitle>
            <Box gap='0.2rem'>
              Описание
              {object?.Description === 'Тут будет комментарий к объекту' && (
                <AlertIcon />
              )}
            </Box>
            <IconButton onClick={toggleEditComment}>
              <Edit />
            </IconButton>
          </SliderTitle>
          <FeatureBlock>
            <TextSpanStyle size={10}>{object?.Description}</TextSpanStyle>
          </FeatureBlock>
        </FeatureBlock>
      </FeatureContainer>
      <DialogWindow open={isEditComment} onClose={toggleEditComment}>
        <SlideDialogComment
          onClose={toggleEditComment}
          comment={object?.Description}
          setNewDescription={setNewDescription}
        />
      </DialogWindow>
    </>
  );
};

export default SlideObjectFeature;
