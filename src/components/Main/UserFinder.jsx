import React, { useEffect, useRef, useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { getUserList } from 'api/search';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';

const UserFinderStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};  
`
const UserFindeHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const UserFinderListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`
const UserFinderItemStyle = styled.div`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
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
const UserFinder = ({ onClose, onChange, title }) => {
  const [value, setValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const inputRef = useRef(null);
  const sendRequest = useRef(false);
  useEffect(() => {
    if(inputRef.current){inputRef.current.focus()};
  }, [])
  useEffect(() => {
    if (!selectUser) { return }
    if (userList.find(user => user.UID === selectUser.UID)) { return }
    clearSelectUser(null);
  }, [userList])
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 1) {
      if (sendRequest.current) {
        return;
      }
      sendRequest.current = true;
      getUserList(value).then((res) => {
        setUserList(res);
      }).finally(() => {
        sendRequest.current = false;
      });
      return
    }

    setUserList([]);
  }
  const changeUser = (user) => {
    setSelectUser(user);
  }
  const clearSelectUser = () => {
    setSelectUser(null);
  }
  const handleSelect = () => {
    if (selectUser) { onChange(selectUser); }
  }
  return (
    <UserFinderStyle>
      <UserFindeHeaderStyle onClick={onClose}>
        <TextSpanStyle>{title}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt="close" />
      </UserFindeHeaderStyle>
      <InputUI value={value} onChange={handleChange} width='300px' ref={inputRef}/>
      <UserFinderListStyle>
        {
          userList.length > 0 ?
            userList.map((user) =>
              <UserFinderItemStyle
                $select={user === selectUser}
                key={user.UID}
                onClick={() => changeUser(user)}
              >{user.lastName} {user.firstName}
              </UserFinderItemStyle>
            ) :
            <UserFinderItemStyle><em>Нет совпадений</em></UserFinderItemStyle>
        }
      </UserFinderListStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelectUser} variant='outline'>Отменить</ButtonUI>
      </div>
    </UserFinderStyle>
  );
};

export default UserFinder;