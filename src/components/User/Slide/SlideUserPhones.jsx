import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import DialogWindow from 'components/Main/DialogWindow';
import WindowPhoneAdd from './WindowPhoneAdd';
import WindowPhoneEdit from './WindowPhoneEdit';
import { CheckboxUI } from 'ui/CheckboxUI';
import { removePhone, setPosition } from '../../../api/usersApi';

const SlideUserPhones = () => {
  const user = useAsyncValue();
  const [addNew, setAddNew] = useState(false);
  const [editPhone, setEditPhone] = useState(null);
  const [deletePhone, setDeletePhone] = useState(false);
  const isAdmin = user?.rights?.admin || false;
  const toggleAddNew = () => {
    setAddNew(!addNew);
  };
  const closeEditPhone = () => {
    setEditPhone(null);
  };
  const setPhoneForEdit = (phone) => {
    setEditPhone(phone);
  };
  const addPhoneToList = (newPhone) => {
    user.phones = [...user.phones, newPhone];
  };
  const removeCurPhone = (phone) => {
    removePhone({
      UID: user.UID,
      phoneId: phone.UID,
    }).then(() => {
      user.phones = user.phones.filter((item) => item.UID !== phone.UID);
    });
    user.phones = user.phones.filter((item) => item.UID !== phone.UID);
    setDeletePhone(!deletePhone);
  };
  const updateEditPhone = (editPhone) => {
    const find = user.phones.find((item) => item.UID === editPhone.UID);
    user.phones.splice(user.phones.indexOf(find), 1, editPhone);
  };
  const handlePosition = (e) => {
    const checked = e.target.checked;
    setPosition({
      UID: user.UID,
      position: checked,
    });
  };
  return (
    <SliderBlock>
      <Box fullWidth gap='0.5rem' ai='normal' column>
        <SliderTitle>
          Телефоны
          {isAdmin && (
            <ButtonLink color='#85009e' size={12} onClick={toggleAddNew}>
              Добавить
            </ButtonLink>
          )}
        </SliderTitle>
        <CheckboxUI
          label={user?.attendant?.checkTitle || ''}
          size='small'
          onChange={handlePosition}
          defaultChecked={user?.attendant?.checkPosition || false}
          disabled={user?.attendant?.isBlocked || true}
          id='checkPosition'
        />
        {Array.isArray(user?.phones) &&
          user?.phones.map((phone) => (
            <PhoneItem
              key={phone.UID}
              phone={phone}
              isAdmin={isAdmin}
              removeCurPhone={removeCurPhone}
              setPhoneForEdit={setPhoneForEdit}
            />
          ))}
      </Box>
      <DialogWindow open={addNew} onClose={toggleAddNew}>
        <WindowPhoneAdd
          UID={user.UID}
          onClose={toggleAddNew}
          addPhoneToList={addPhoneToList}
        />
      </DialogWindow>
      <DialogWindow open={Boolean(editPhone)} onClose={closeEditPhone}>
        <WindowPhoneEdit
          UID={user.UID}
          onClose={closeEditPhone}
          curPhone={editPhone}
          updateEditPhone={updateEditPhone}
        />
      </DialogWindow>
    </SliderBlock>
  );
};

const PhoneItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #d9d9d9;
`;
const PhoneItem = ({ phone, isAdmin, removeCurPhone, setPhoneForEdit }) => {
  return (
    <PhoneItemStyle>
      <Box jc='space-between'>
        <TextSpanStyle>
          Тип: {phone?.type ? typePhone[phone?.type] : ''}
        </TextSpanStyle>
        <TextSpanStyle>{phone?.phone || ''}</TextSpanStyle>
      </Box>
      <Box jc='space-between'>
        {phone?.megafonPhoneId ? (
          <Box column gap='0' ai='flex-start'>
            <TextSpanStyle size={10}>Логин ВАТС</TextSpanStyle>
            <TextSpanStyle size={12}>
              {phone?.megafonPhoneId || ''}
            </TextSpanStyle>
          </Box>
        ) : (
          <div></div>
        )}
        {phone?.idSIM ? (
          <Box column gap='0' ai='flex-end'>
            <TextSpanStyle size={10}>ID СИМ-Карты</TextSpanStyle>
            <TextSpanStyle size={12}>{phone?.idSIM || ''}</TextSpanStyle>
          </Box>
        ) : (
          <div></div>
        )}
      </Box>
      {isAdmin && (
        <Box jc='flex-end'>
          <ButtonLink
            size={12}
            color='#00b100'
            onClick={() => {
              setPhoneForEdit(phone);
            }}
          >
            Редактировать
          </ButtonLink>
          {phone.type !== 'main' && (
            <ButtonLink
              size={12}
              color='red'
              onClick={() => {
                removeCurPhone(phone);
              }}
            >
              Удалить
            </ButtonLink>
          )}
        </Box>
      )}
    </PhoneItemStyle>
  );
};

const typePhone = {
  main: 'Основной',
  domclick: 'Домклик',
  other: 'Дополнительный',
};

export default SlideUserPhones;
