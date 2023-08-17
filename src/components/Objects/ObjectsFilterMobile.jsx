import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';
import SlideWindow from "components/Main/SlideWindow";
import ObjectsFilterForm from './ObjectsFilterForm';

const ObjectsFilterMobileStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  padding-bottom: 0;
`
const MobileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 100%;
`
const MobileFormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ObjectsFilterMobile = ({ getList }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  }
  const handleGetList = () => {
    getList();
    handleClose();
  }
  return (
    <ObjectsFilterMobileStyle>
      <ButtonUI size='small' onClick={handleClose}>Фильтр</ButtonUI>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={handleClose} width='100%'>
        <MobileForm>
          <MobileFormWrap>
            <ObjectsFilterForm />
          </MobileFormWrap>
          <ButtonUI size='small' variant='outline' onClick={handleGetList}>Применить</ButtonUI>
        </MobileForm>
      </SlideWindow>
    </ObjectsFilterMobileStyle>
  );
};

export default ObjectsFilterMobile;