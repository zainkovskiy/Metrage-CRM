import React, { useState } from 'react';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { getСontactList } from 'api/search';

const SlideContacFindStyle = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`;
const FieldFind = styled.div`
  border-radius: 5px;
  border: 1px solid #e2e2e2;
  flex-grow: 1;
  overflow: auto;
`;
const FindItem = styled(TextSpanStyle)`
  padding: 0.5rem;
  cursor: pointer;
  ${({ $select }) => $select && 'background-color: #84019e4a;'};
  &:hover {
    background-color: ${({ $select }) => ($select ? '#84019e6e' : '#f9f5f5')};
  }
`;
const SlideContacFind = () => {
  const [contactList, setContactList] = useState([]);
  const [selectContact, setSelectContact] = useState('');
  const [search, setSearch] = useState(false);
  const findContact = async (value) => {
    if (search) {
      return;
    }
    setSearch(true);
    getСontactList(value)
      .then((data) => {
        setContactList(data);
      })
      .finally(() => {
        setSearch(false);
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length < 2) {
      setContactList([]);
      return;
    }
    findContact(value);
  };
  const setContact = (contact) => {
    setSelectContact(contact);
  };
  return (
    <SlideContacFindStyle onClick={(e) => e.stopPropagation()}>
      <InputUI onChange={handleChange} type='search' />
      <FieldFind>
        {contactList.length > 0 &&
          contactList.map((contact) => (
            <FindItem
              key={contact?.UID}
              onClick={() => setContact(contact)}
              $select={
                JSON.stringify(contact) === JSON.stringify(selectContact)
              }
            >
              {contact?.lastName || ''} {contact?.firstName || ''}{' '}
              {contact?.secondName || ''}
            </FindItem>
          ))}
      </FieldFind>
      <Box jc='flex-start'>
        <ButtonUI size='small'>Сохранить</ButtonUI>
        <ButtonUI size='small' variant='outline'>
          Очистить
        </ButtonUI>
      </Box>
    </SlideContacFindStyle>
  );
};

export default SlideContacFind;
