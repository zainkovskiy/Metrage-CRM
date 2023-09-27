import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';
import { ButtonLink } from 'ui/ButtonLink';
import { createNewCompilation } from '../../store/compilationSlice';

const ObjectBasketStyle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid rgb(132, 1, 158);
  border-radius: 5px;
  min-width: 250px;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ObjectBasketItems = styled.div`
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const ObjectBasketItem = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;
const ObjectBasket = () => {
  const basket = useSelector((state) => state.objects.basket);
  const dispatch = useDispatch();
  const createCompilation = () => {
    dispatch(createNewCompilation());
  };
  if (basket.length === 0) {
    return (
      <ObjectBasketStyle>
        <TextSpanStyle nowrap>В подборках пусто</TextSpanStyle>
      </ObjectBasketStyle>
    );
  }
  return (
    <ObjectBasketStyle id='basket'>
      <ObjectBasketItems>
        {basket.map((item) => (
          <ObjectBasketItem key={item.UID}>
            <Box column ai='flex-start' fullWidth gap='0'>
              <TextSpanStyle size={12}>
                {item?.addressId?.addrString || 'Нет адреса'}
              </TextSpanStyle>
              <TextSpanStyle size={12}>
                {item?.Price ? useNumberTriad(item?.Price) : 0} руб.
              </TextSpanStyle>
            </Box>
            <ButtonLink onClick={() => {}} size={12}>
              Удалить
            </ButtonLink>
          </ObjectBasketItem>
        ))}
      </ObjectBasketItems>
      <Box fullWidth column>
        <ButtonUI fullWidth onClick={createCompilation}>
          Создать подборку
        </ButtonUI>
        <ButtonUI fullWidth>Добавить в подборку</ButtonUI>
      </Box>
    </ObjectBasketStyle>
  );
};

export default ObjectBasket;
