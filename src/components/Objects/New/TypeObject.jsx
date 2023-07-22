import React from 'react';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import RadioButton from 'ui/RadioButton/RadioButton';
import { ObjectSliderBox } from '../ObjectsStyle';
import { Controller, useFormContext } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

const Category = () => {
  const { control, getValues } = useFormContext();
  const typeEstate = getValues('typeEstate');
  const TypeObjectComponent = getTypeObjectComponent(typeEstate);
  return (
    <AnimatePresence mode='wait'>
      <TypeObjectComponent key={typeEstate} control={control} />
    </AnimatePresence>
  );
};

const getTypeObjectComponent = (typeEstate) => {
  switch (typeEstate) {
    case 'residential':
      return ResidentialComponent;
    case 'commercial':
      return CommercialComponent;
  }
}
const ResidentialComponent = ({ control }) => {
  return (
    <ObjectSliderBox
      $column
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box column ai='flex-start'>
        <TextSpanStyle>Объект</TextSpanStyle>
        <Controller
          name='Category'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Box fullWidth ai='flex-start'>
              <Box fullWidth column ai='flex-start'>
                <RadioButton label='Квартира' id='flatSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Новостройка' id='newBuildingFlatSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Доля в квартире' id='flatShareSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Комната' id='roomSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Гараж' id='garageSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
              </Box>
              <Box fullWidth column ai='flex-start'>
                <RadioButton label='Дом' id='houseSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Часть дома' id='houseShareSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Коттедж' id='cottageSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Таунхаус' id='townhouseSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Участок' id='landSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
              </Box>
            </Box>
          )}
        />
      </Box>
    </ObjectSliderBox >
  )
}
const CommercialComponent = ({ control }) => {
  return (
    <ObjectSliderBox
      $column
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box column ai='flex-start'>
        <TextSpanStyle>Объект</TextSpanStyle>
        <Controller
          name='Category'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Box fullWidth ai='flex-start'>
              <Box fullWidth column ai='flex-start'>
                <RadioButton label='Офис' id='officeSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Здание' id='buildingSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Торговая площадь' id='shoppingAreaSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Помещение свободного назначения' id='freeAppointmentObjectSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Производство' id='industrySale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
              </Box>
              <Box fullWidth column ai='flex-start'>
                <RadioButton label='Склад' id='warehouseSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Бизнес' id='businessSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
                <RadioButton label='Коммерческая земля' id='commercialLandSale' name='Category' onChange={(e) => field.onChange(e.target.id)} active={field.value} />
              </Box>
            </Box>
          )}
        />
      </Box>
    </ObjectSliderBox >
  )
}
export default Category;

