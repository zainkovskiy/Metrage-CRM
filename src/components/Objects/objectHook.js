import styled from "styled-components";
import FormFlat from "./New/FormTemplate/FormFlat";
import FormRoom from './New/FormTemplate/FormRoom';
import FormNewBuilding from './New/FormTemplate/FormNewBuilding';
import FormFlatShare from './New/FormTemplate/FormFlatShare';
import FormGarage from './New/FormTemplate/FormGarage';
import FormHouse from './New/FormTemplate/FormHouse';
import FormHouseShare from './New/FormTemplate/FormHouseShare';
import FormoCottage from './New/FormTemplate/FormoCottage';
import FormTownhouse from './New/FormTemplate/FormTownhouse';
import FormLand from './New/FormTemplate/FormLand';
import FormOffice from './New/FormTemplate/FormOffice';
import FormBuilding from './New/FormTemplate/FormBuilding';
import FormShoppingArea from './New/FormTemplate/FormShoppingArea';
import FormFreeAppointmentObject from './New/FormTemplate/FormFreeAppointmentObject'
import FormIndustry from './New/FormTemplate/FormIndustry';
import FormWarehouse from './New/FormTemplate/FormWarehouse';
import FormBusiness from './New/FormTemplate/FormBusiness';
import FormCommercialLand from './New/FormTemplate/FormCommercialLand';
import {useNumberTriad} from 'hooks/StringHook';
const DefaultComponent = styled.div`
`

export const useSelectCategoryField = (category, type) => {
  if (!type || !category) {
    return
  }
  if (type === 'residential') {
    switch (category) {
      case 'flatSale':
        return FormFlat;
      case 'newBuildingFlatSale':
        return FormNewBuilding;
      case 'flatShareSale':
        return FormFlatShare;
      case 'roomSale':
        return FormRoom;
      case 'garageSale':
        return FormGarage;
      case 'houseSale':
        return FormHouse;
      case 'houseShareSale':
        return FormHouseShare;
      case 'cottageSale':
        return FormoCottage;
      case 'townhouseSale':
        return FormTownhouse;
      case 'landSale':
        return FormLand;
      default:
        return DefaultComponent;
    }
  }
  if (type === 'commercial') {
    switch (category) {
      case 'officeSale':
        return FormOffice;
      case 'buildingSale':
        return FormBuilding;
      case 'shoppingAreaSale':
        return FormShoppingArea;
      case 'freeAppointmentObjectSale':
        return FormFreeAppointmentObject;
      case 'industrySale':
        return FormIndustry;
      case 'warehouseSale':
        return FormWarehouse;
      case 'businessSale':
        return FormBusiness;
      case 'commercialLandSale':
        return FormCommercialLand;
      default:
        break;
    }
    return DefaultComponent;
  }
  return DefaultComponent;
}

export const useGetMeterPrice = (price, area) => {
  if (!price || !area) return 0
  const priceNumber = parseFloat(price.replace(/\s/g, ''));
  const areaNumber = parseFloat(area);
  if (typeof priceNumber === 'number' && typeof areaNumber === 'number') {
    return useNumberTriad(Math.floor(priceNumber / areaNumber))
  }
  return 0
}