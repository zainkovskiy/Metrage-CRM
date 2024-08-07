import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import SearchSuggestions from './SearchSuggestions';
import { AnimatePresence } from 'framer-motion';
import { universalFinder } from '../../api/search';
import { ReactComponent as SVGSearch } from 'images/input_search.svg';

const IconSearch = styled(SVGSearch)`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const SearchStyle = styled.div`
  width: 60%;
  position: relative;
`;
const Search = () => {
  const sendReponse = useRef(false);
  const searchRef = useRef(null);
  const [findList, setFindList] = useState(null);
  const handleSearch = (e) => {
    if (sendReponse.current) {
      return;
    }
    const value = e.target.value.trimStart();
    if (value?.length < 2) {
      setFindList(null);
      return;
    }
    findSuggestion(value);
  };
  const findSuggestion = (value) => {
    sendReponse.current = true;
    universalFinder(value, window.location.href)
      .then((data) => {
        setFindList(data);
      })
      .finally(() => {
        sendReponse.current = false;
      });
  };
  const clearSuggestions = () => {
    setFindList(null);
    searchRef.current.value = '';
  };
  return (
    <SearchStyle>
      <InputUI
        type='search'
        name='search'
        onChange={handleSearch}
        onFocus={handleSearch}
        placeholder='Поиск'
        cleareApperance
        customIcon={<IconSearch onClick={clearSuggestions} />}
        ref={searchRef}
      />
      <AnimatePresence>
        {findList && (
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
