import React, { useEffect, useState } from 'react';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import { getPositionList } from '../../../api/usersApi';
import Loader from 'components/Main/Loader';

const WindowChangePositionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  min-width: 330px;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PositionListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 30vh;
  overflow: auto;
  padding: 0.5rem 0;
`;
const PositionItem = styled.div`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $select }) => ($select ? '#84019e4a' : '#fff')};
  &:hover {
    background-color: ${({ $select }) =>
      $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const WindowChangePosition = ({ onClose, onChange }) => {
  const [list, setList] = useState([]);
  const [selectPosition, setSelectPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    getPositionList()
      .then((data) => {
        setList(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const changePosition = (user) => {
    setSelectPosition(user);
  };
  const handleSelect = () => {
    if (selectPosition) {
      onChange(selectPosition);
      onClose();
    }
  };
  return (
    <WindowChangePositionStyle onClick={(e) => e.stopPropagation()}>
      <Header>
        <TextSpanStyle>Выберите должность</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Header>
      <PositionList
        list={list}
        selectPosition={selectPosition}
        changePosition={changePosition}
        loading={loading}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={onClose} variant='outline'>
          Закрыть
        </ButtonUI>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
      </div>
    </WindowChangePositionStyle>
  );
};

const LoaderContainer = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PositionList = ({ list, selectPosition, changePosition, loading }) => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }
  return (
    <PositionListStyle>
      {list.length > 0 ? (
        list.map((item) => (
          <PositionItem
            $select={item === selectPosition}
            key={item.UID}
            onClick={() => changePosition(item)}
          >
            {item.positionName}
          </PositionItem>
        ))
      ) : (
        <PositionItem>
          <em>Нет совпадений</em>
        </PositionItem>
      )}
    </PositionListStyle>
  );
};

export default WindowChangePosition;
