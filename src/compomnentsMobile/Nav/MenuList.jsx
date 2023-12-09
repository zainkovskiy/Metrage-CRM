import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Search } from 'images/search.svg';
import { getUserList, getСontactList, getObjectList } from 'api/search';
import MobileSuggestionList from './MobileSuggestionList';
import MenuListButton from './MenuListButton';
const variants = {
  open: {},
  closed: {},
};
const MenuListStyle = styled(motion.div)`
  position: fixed;
  background-color: #85009e;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const MenuListTop = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const LinkNav = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family};
`;
const LinkOriginNav = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family};
`;
const SerachContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
const ButtonSearch = styled.div`
  display: flex;
  & > svg {
    pointer-events: none;
    width: 24px;
    height: 24px;
  }
`;
const InputSearch = styled(motion.input)`
  font-family: ${({ theme }) => theme.font.family};
  border: none;
  outline: none;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  position: absolute;
  height: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 0 0.3rem;
  box-sizing: border-box;
  border: 1px solid #fff;
`;
const MenuList = ({ onClose }) => {
  const inputRef = useRef(null);
  const sendReponse = useRef(false);
  const [findList, setFindList] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (openSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openSearch]);
  const focusSearch = () => {
    setOpenSearch(!openSearch);
  };
  const handleSearch = (e) => {
    if (sendReponse.current) {
      return;
    }
    const value = e.target.value.trimStart();
    if (value?.length < 3) {
      setFindList([]);
      return;
    }
    findSuggestion(value);
  };
  const findSuggestion = (value) => {
    sendReponse.current = true;
    Promise.allSettled([
      getСontactList(value),
      getUserList(value),
      getObjectList(value),
    ])
      .then((res) => {
        setFindList([
          {
            title: 'Контакты',
            path: '/client',
            list: res[0].status === 'fulfilled' ? res[0].value : [],
          },
          {
            title: 'Пользователи',
            path: '/users',
            list: res[1].status === 'fulfilled' ? res[1].value : [],
          },
          {
            title: 'Объекты',
            path: '/objects',
            list: res[2].status === 'fulfilled' ? res[2].value : [],
          },
        ]);
      })
      .finally(() => {
        sendReponse.current = false;
      });
  };
  const isShowSuggestions = () => {
    for (let item of findList) {
      if (item?.list?.length > 0) {
        return true;
      }
    }
    return false;
  };
  const clearSuggestions = () => {
    setFindList([]);
  };
  const clickSuggestion = () => {
    clearSuggestions();
    onClose();
  };
  return (
    <MenuListStyle variants={variants} onClick={clearSuggestions}>
      <SerachContainer>
        <AnimatePresence initial={false}>
          {openSearch && (
            <InputSearch
              ref={inputRef}
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              exit={{ width: 0 }}
              onChange={handleSearch}
              onFocus={handleSearch}
              // onBlur={clearSuggestions}
            />
          )}
        </AnimatePresence>
        <ButtonSearch onClick={focusSearch}>
          <Search />
        </ButtonSearch>
      </SerachContainer>
      {isShowSuggestions() ? (
        <MobileSuggestionList
          findList={findList}
          clickSuggestion={clickSuggestion}
        />
      ) : (
        <MenuListTop>
          <MenuListButton title='На главную' path='/' onClick={onClose} />
          <MenuListButton
            title='Заявки'
            icon='application'
            path='application'
            onClick={onClose}
          />
          <MenuListButton
            title='Объекты'
            icon='objects'
            path='objects'
            onClick={onClose}
          />
          <MenuListButton
            title='Сделки'
            icon='deal'
            path='deal'
            onClick={onClose}
          />
          <MenuListButton
            title='Подборки'
            icon='compilation'
            path='compilation'
            onClick={onClose}
          />
          <MenuListButton
            title='Клиенты'
            icon='client'
            path='client'
            onClick={onClose}
          />
          <MenuListButton
            title='Пользователи'
            icon='users'
            path='users'
            onClick={onClose}
          />
          <MenuListButton
            title='Задачи'
            icon='task'
            path='task'
            onClick={onClose}
          />
          <MenuListButton
            title='Новости'
            icon='news'
            path='news'
            onClick={onClose}
          />
          {/* <LinkNav to='/' onClick={onClose}>
            На главную
          </LinkNav>
          <LinkNav to='/application' onClick={onClose}>
            Заявки
          </LinkNav>
          <LinkNav to='/objects' onClick={onClose}>
            Объекты
          </LinkNav>
          <LinkNav to='/deal' onClick={onClose}>
            Сделки
          </LinkNav>
          <LinkNav to='/compilation' onClick={onClose}>
            Подборки
          </LinkNav> */}
          {/* <LinkNav to='/client' onClick={onClose}>
            Клиенты
          </LinkNav>
          <LinkNav to='/users' onClick={onClose}>
            Пользователи
          </LinkNav>
          <LinkNav to='/task' onClick={onClose}>
            Задачи
          </LinkNav> */}
        </MenuListTop>
      )}
      <LinkOriginNav
        target='_href'
        href='http://crm.metragegroup.com/mail'
        onClick={onClose}
      >
        Почта
      </LinkOriginNav>
    </MenuListStyle>
  );
};
export default MenuList;
