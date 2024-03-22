import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import SearchSuggestions from './SearchSuggestions';
import {
  getUserList,
  getСontactList,
  getObjectList,
  getResidentialList,
  getBuildersList,
} from 'api/search';
import { AnimatePresence } from 'framer-motion';

const SearchStyle = styled.div`
  width: 60%;
  position: relative;
`;
const Search = () => {
  const sendReponse = useRef(false);
  const [findList, setFindList] = useState([]);
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
      getResidentialList(value),
      getBuildersList(value),
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
          {
            title: 'ЖК и Кот. посёлки',
            path: '/residential',
            list: res[3].status === 'fulfilled' ? res[3].value : [],
          },
          {
            title: 'Застройщик',
            path: '/builder',
            list: res[4].status === 'fulfilled' ? res[4].value : [],
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
  return (
    <SearchStyle>
      <InputUI
        type='search'
        name='search'
        onChange={handleSearch}
        onFocus={handleSearch}
        placeholder='Поиск'
      />
      <AnimatePresence>
        {isShowSuggestions() && (
          <SearchSuggestions
            suggestions={findList}
            clearSuggestions={clearSuggestions}
          />
        )}
      </AnimatePresence>
    </SearchStyle>
  );
};

export default Search;
