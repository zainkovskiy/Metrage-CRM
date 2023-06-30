import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { getOfficeList } from 'api/search';
import { useDispatch } from 'react-redux';
import { changeAgent } from 'store/taskSlice';

const TaskHandOverStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};  
  min-width: 250px;
`
const TaskHandOverHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const OfficeListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`
const OfficeItemStyle = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${({ $select }) => $select ? '#84019e4a' : '#fff'};
  &:hover{
    background-color: ${({ $select }) => $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: .5;
  cursor: pointer;
  transition: transform .3s;
  &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.9);
  }
`
const TaskHandOver = ({ title, onClose, UID, closeSlide }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    getList();
  }, [])
  const getList = async () => {
    getOfficeList().then((res) => {
      setList(res);
    })
  }
  const selectOffice = (office) => {
    setSelect(office);
  }
  const clearSelect = () => {
    setSelect(null);
  }
  const changeOffice = () => {
    dispatch(changeAgent({
      UID: UID,
      responsibleId: select.UID,
      interaction: true,
    })).then((res) => {
      if (res?.payload === 'OK') {
        setTimeout(() => {
          closeSlide();
        }, 300)
        onClose();
      }
    })
  }
  return (
    <TaskHandOverStyle onClick={(e) => e.stopPropagation()}>
      <TaskHandOverHeaderStyle>
        <TextSpanStyle>{title}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </TaskHandOverHeaderStyle>
      <OfficeListStyle>
        {
          list.map((item) => (
            <OfficeItemStyle key={item.UID} $select={select === item} onClick={() => selectOffice(item)}>
              <TextSpanStyle>{item?.officeName}</TextSpanStyle>
              <TextSpanStyle size={10} color='#7e7777'>{item?.officeAddress}</TextSpanStyle>
            </OfficeItemStyle>
          ))
        }
      </OfficeListStyle>
      <Box>
        <ButtonUI onClick={changeOffice}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelect} variant='outline'>Отменить</ButtonUI>
      </Box>
    </TaskHandOverStyle>
  );
};

export default TaskHandOver;