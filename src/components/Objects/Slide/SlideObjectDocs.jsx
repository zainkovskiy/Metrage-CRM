import React, { useState } from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UploderFiles from 'components/Main/UploderFiles';
import SlideContacFind from 'components/Deal/Slide/SlideContacFind';
import DialogWindow from 'components/Main/DialogWindow';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { ButtonLink } from 'ui/ButtonLink';
import { LinkUI } from 'ui/LinkUI';
import { TextSpanStyle } from '../../../styles/styles';
import {
  setObjectContact,
  setObjectExclusive,
  setObjectExclusiveDate,
} from '../../../api/objectAPI';
import SlideContactNew from './SlideContactNew';

const ControllWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const FilesSide = styled.div`
  display: flex;
  flex-grow: 1;
`;
const InputsSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
  flex-grow: 1;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.family};
  color: #000;
  font-size: 12px;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const FileItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  width: 100%;
`;
const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SlideObjectDocs = () => {
  const object = useAsyncValue();
  const user = useSelector((state) => state.user);
  const [checkboxValue, setCheckboxValue] = useState(
    object?.isExclusive || false
  );
  const [dateValue, setDateValue] = useState(object?.exclusiveDate || '');
  const [open, setOpen] = useState(false);

  const openWindow = (e) => {
    const id = e.target.id;
    setOpen(id);
  };
  const closeWindow = () => {
    setOpen(null);
  };
  const handleCheckbox = (e) => {
    setObjectExclusive({
      UID: object?.UID,
      isExclusive: e.target.checked,
      type: object?.subTypeEstate,
    });
    setCheckboxValue(e.target.checked);
  };
  const handleDate = (e) => {
    setObjectExclusiveDate({
      UID: object?.UID,
      exclusiveDate: e.target.value,
      type: object?.subTypeEstate,
    });
    setDateValue(e.target.value);
  };
  const addContact = (contact) => {
    setObjectContact({
      UID: object?.UID,
      type: object?.subTypeEstate,
      contactId: contact.UID,
    });
    object.contact = contact;
    closeWindow();
  };
  const setNewClient = (newContact) => {
    object.contact = newContact;
    closeWindow();
  };
  const uploadFiles = (files) => {
    console.log(files);
  };
  const raw = {
    entityId: object.UID,
    entityType: object?.subTypeEstate,
    author: user.UID,
  };
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Дополнительно</SliderTitle>
        <ControllWrap>
          <InputsSide>
            <Box column ai='flex-start'>
              <CheckboxUI
                label='Эксклюзив до:'
                id='isExclusive'
                checked={checkboxValue}
                onChange={handleCheckbox}
                size='small'
                disabled={user?.isChief !== '1'}
              />
              <InputUI
                fullWidth
                type='date'
                name='exclusiveDate'
                value={dateValue}
                onChange={handleDate}
                disabled={!checkboxValue || user?.isChief !== '1'}
                small
              />
            </Box>
            <Box column ai='flex-start' gap='0'>
              <TextSpanStyle>Собственник:</TextSpanStyle>
              {object?.contact ? (
                <LinkStyle to={`/client/${object?.contact?.UID}`}>
                  {object?.contact?.secondName || ''}{' '}
                  {object?.contact?.firstName || ''}{' '}
                  {object?.contact?.lastName || ''}
                </LinkStyle>
              ) : (
                <Box>
                  <ButtonLink
                    size={12}
                    onClick={openWindow}
                    color='#7b7a7a'
                    id='choose'
                  >
                    Выбрать
                  </ButtonLink>
                  <ButtonLink
                    size={12}
                    onClick={openWindow}
                    color='#7b7a7a'
                    id='new'
                  >
                    Создать
                  </ButtonLink>
                </Box>
              )}
            </Box>
          </InputsSide>
          <FilesSide>
            <UploderFiles raw={raw} callback={uploadFiles} fullWidth multiple />
          </FilesSide>
          {object?.files?.length > 0 && (
            <Box fullWidth column>
              <SliderTitle size={14}>Файлы</SliderTitle>
              <FileItems>
                {object?.files.map((file) => (
                  <FileItem key={file.UID}>
                    <TextSpanStyle size={12}>{file.name}</TextSpanStyle>
                    <LinkUI
                      size={12}
                      href={file.downloadUrl}
                      target='_blank'
                      download
                    >
                      Скачать
                    </LinkUI>
                  </FileItem>
                ))}
              </FileItems>
            </Box>
          )}
        </ControllWrap>
      </Box>
      <DialogWindow onClose={closeWindow} open={open === 'choose'}>
        <SlideContacFind addContact={addContact} onClose={closeWindow} />
      </DialogWindow>
      <DialogWindow onClose={closeWindow} open={open === 'new'}>
        <SlideContactNew onClose={closeWindow} setNewClient={setNewClient} />
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideObjectDocs;
