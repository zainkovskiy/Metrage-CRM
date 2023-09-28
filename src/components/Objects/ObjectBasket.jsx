import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';
import { ButtonLink } from 'ui/ButtonLink';
import {
  createNewCompilation,
  addToCompilation,
} from '../../store/compilationSlice';
import { removeFromBasket } from '../../store/objectSlice';
import { getCompilationSimpleList } from '../../api/compilationAPI';

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
const ObjectCompilationItem = styled.div`
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #eee;
  }
`;
const ObjectBasket = () => {
  const basket = useSelector((state) => state.objects.basket);
  const [compilationList, setCompilationList] = useState(null);
  const dispatch = useDispatch();
  const createCompilation = () => {
    dispatch(createNewCompilation());
  };
  const removeItem = (object) => {
    dispatch(removeFromBasket(object));
  };
  const requestCompilationList = () => {
    getCompilationSimpleList().then((data) => {
      setCompilationList(data);
    });
  };
  const clearCompilation = () => {
    setCompilationList(null);
  };
  const selectCompilation = ({ id }) => {
    dispatch(addToCompilation(id));
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
  if (compilationList) {
    return (
      <CompilationList
        compilationList={compilationList}
        clearCompilation={clearCompilation}
        selectCompilation={selectCompilation}
      />
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
        <ButtonUI size='small' fullWidth onClick={createCompilation}>
          Создать подборку
        </ButtonUI>
        <ButtonUI
          size='small'
          fullWidth
          id='basket'
          onClick={requestCompilationList}
        >
          Добавить в подборку
        </ButtonUI>
      </Box>
    </ObjectBasketStyle>
  );
};
const CompilationList = ({
  compilationList,
  clearCompilation,
  selectCompilation,
}) => {
  return (
    <ObjectBasketStyle id='basket'>
      <TextSpanStyle>Выберете подборку</TextSpanStyle>
      <ObjectBasketItems id='basket'>
        {compilationList.map((item) => (
          <ObjectCompilationItem
            key={item.UID}
            onClick={() => selectCompilation(item.UID)}
          >
            <TextSpanStyle size={12}>{item?.name || 'Без имени'}</TextSpanStyle>
          </ObjectCompilationItem>
        ))}
      </ObjectBasketItems>
      <Box fullWidth column id='basket'>
        <ButtonUI id='basket' size='small' fullWidth onClick={clearCompilation}>
          Назад
        </ButtonUI>
      </Box>
    </ObjectBasketStyle>
  );
};
export default ObjectBasket;
