import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import metrageUrl from 'images/logo_small.svg';
import { useAsyncValue } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeClientResponsible } from '../../../store/clientsSlice';
const ResponsibleSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ClientIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
const SliderClientResponsible = () => {
  const client = useAsyncValue();
  const dispatch = useDispatch();
  const [openChange, setOpenChange] = useState(false);
  const toggleOpenChange = () => {
    setOpenChange(!openChange);
  };
  const changeResponsible = (user) => {
    dispatch(
      changeClientResponsible({
        UID: client.UID,
        responsibleId: user.UID,
      })
    )
      .unwrap()
      .then((answer) => {
        if (answer === 'OK') {
          client.responsible = user;
        }
      });
    toggleOpenChange();
  };
  const getNameResponsible = () => {
    if (client?.responsible) {
      return `${client?.responsible?.lastName || ''} ${
        client?.responsible?.firstName || ''
      }`;
    }
    return 'Нет ответственного';
  };
  return (
    <>
      <SliderBlock>
        <ResponsibleSide>
          <SliderTitle>Ответственный</SliderTitle>
          <Box jc='space-between'>
            <TextSpanStyle>{getNameResponsible()}</TextSpanStyle>
            {client?.isEditor && (
              <ButtonUI size='small' onClick={toggleOpenChange}>
                Сменить
              </ButtonUI>
            )}
          </Box>
        </ResponsibleSide>
      </SliderBlock>
      <DialogWindow open={openChange} onClose={toggleOpenChange}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder onClose={toggleOpenChange} onChange={changeResponsible} />
        </div>
      </DialogWindow>
    </>
  );
};

export default SliderClientResponsible;
