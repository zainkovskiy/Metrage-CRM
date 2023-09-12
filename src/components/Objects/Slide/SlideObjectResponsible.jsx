import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { useDispatch } from 'react-redux';
import { changeObjectResponsible } from '../../../store/objectSlice';
import { useAsyncValue } from 'react-router-dom';

const ResponsibleAvatar = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
`;
const SlideObjectResponsible = ({ currentResponsible }) => {
  const object = useAsyncValue();
  const dispatch = useDispatch();
  const [responsible, setResponsible] = useState(currentResponsible);
  const [openChange, setOpenChange] = useState(false);
  const toggleOpenChange = () => {
    setOpenChange(!openChange);
  };
  const changeResponsible = (user) => {
    setResponsible(user);
    dispatch(
      changeObjectResponsible({
        UID: object.UID,
        type: object.typeEstate,
        responsibleId: user.UID,
      })
    )
      .unwrap()
      .then((answer) => {
        if (answer === 'OK') {
          toggleOpenChange();
        }
      });
  };
  return (
    <>
      <Box column ai='flex-start' gap='0.2rem'>
        <Box gap='0.2rem'>
          <TextSpanStyle size={10}>Ответственный:</TextSpanStyle>
          <ButtonLink size={10} color='#bd79c9' onClick={toggleOpenChange}>
            сменить
          </ButtonLink>
        </Box>
        <Box>
          <ResponsibleAvatar src={useGetAvatar(responsible || null)} />
          <TextSpanStyle>
            {responsible?.lastName || ''} {responsible?.firstName || ''}
          </TextSpanStyle>
        </Box>
      </Box>
      <DialogWindow open={openChange} onClose={toggleOpenChange}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder onClose={toggleOpenChange} onChange={changeResponsible} />
        </div>
      </DialogWindow>
    </>
  );
};

export default SlideObjectResponsible;
