import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';
import { ButtonLink } from 'ui/ButtonLink';
import { createNewCompilation } from '../../store/compilationSlice';
import { removeFromBasket } from '../../store/objectSlice';

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
  const removeItem = (object) => {
    dispatch(removeFromBasket(object));
  };
  if (basket.length === 0) {
    return (
      <ObjectBasketStyle id='basket'>
        <TextSpanStyle nowrap id='basket'>
          В подборках пусто
        </TextSpanStyle>
      </ObjectBasketStyle>
    );
  }
  return (
    <ObjectBasketStyle id='basket'>
      <ObjectBasketItems id='basket'>
        {basket.map((item) => (
          <ObjectBasketItem id='basket' key={item.UID}>
            <Box column ai='flex-start' fullWidth gap='0' id='basket'>
              <TextSpanStyle size={12} id='basket'>
                {item?.addressId?.addrString || 'Нет адреса'}
              </TextSpanStyle>
              <TextSpanStyle size={12} id='basket'>
                {item?.Price ? useNumberTriad(item?.Price) : 0} руб.
              </TextSpanStyle>
            </Box>
            <ButtonLink onClick={() => removeItem(item)} size={12} id='basket'>
              Удалить
            </ButtonLink>
          </ObjectBasketItem>
        ))}
      </ObjectBasketItems>
      <Box fullWidth column id='basket'>
        <ButtonUI fullWidth onClick={createCompilation} id='basket'>
          Создать подборку
        </ButtonUI>
        <ButtonUI fullWidth id='basket'>
          Добавить в подборку
        </ButtonUI>
      </Box>
    </ObjectBasketStyle>
  );
};

export default ObjectBasket;
