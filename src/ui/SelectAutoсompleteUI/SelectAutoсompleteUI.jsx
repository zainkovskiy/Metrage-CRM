import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import { ReactComponent as Close } from 'images/close.svg';
import styled, { css } from 'styled-components';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { TextSpanStyle } from 'styles/styles';
import { v4 as uuidv4 } from 'uuid';

const SelectContainer = styled.div`
  position: relative;
  border: 1px solid transparent;
  border-color: transparent;
  border-radius: 6px;
  transition: border-color 0.3s;
  &:has(input:focus) {
    border-color: ${({ theme, error }) =>
      error ? 'red' : theme.color.primary};
  }
`;
const LabelSelect = styled(LabelStyle)`
  position: relative;
`;
const SelectInputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${({ $small }) =>
    $small ? '0.2rem 50px 0.2rem 0.5rem' : '0.5rem 50px 0.5rem 0.5rem'};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  outline: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => (props.type === 'password' ? '1.25px' : '')};
`;
const ButtonSelect = styled.div`
  border-radius: 40px;
  padding: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: background-color 0.3s;
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: transparent;
  }
  & > svg {
    pointer-events: none;
    width: 12px;
    height: 12px;
    transition: transform 0.3s;
    ${({ open }) => open && 'transform: rotate(180deg);'};
  }
`;
const ButtonWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0px;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectItemsContainer = styled(motion.div)`
  position: absolute;
  height: 100px;
  background-color: #fff;
  position: absolute;
  height: 100px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  z-index: 99;
  top: ${({ $error }) => ($error ? '100%' : 'calc(100% + 10px)')};
  left: 0;
  right: 0;
  max-height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
  box-sizing: border-box;
`;
const variants = {
  vissible: {
    height: 'auto',
    opacity: 1,
  },
  hidden: {
    height: 0,
    opacity: 0,
  },
};

//props
// options список
// getOptionsLabel функуция/правило отображения текста в списке return option
// filterOptions функуция/правило применения фильтра return option
// inputChange return input value if change
// value значение для управляемого компонента
// onChange, функуция для управляемого компонента return option
// label, текст над инпутом
// fullWidth, при fullWidth width 100%
// inputRef, ref для управляемого компонента
// error, ошибки для react-hooks-form
// disabled, disabled
// small, уменьшает paddings
// if loading в листе рисует лоадер

export const SelectAutoсompleteUI = (props) => {
  // console.log(props);
  const {
    loading,
    options,
    inputChange,
    getOptionsLabel,
    getOptionsSubtitle,
    defaultValueText,
    filterOptions,
    value,
    onChange,
    label,
    fullWidth,
    inputRef,
    error,
    disabled,
    small,
    placeholder,
  } = props;
  const [open, setOpen] = useState(false); //если true показывает список options
  const firstOpen = useRef(true); //при первом открытии списка окрывает полный
  const idRef = useRef(uuidv4().split('-')[0]).current; // айди для всех блоков
  const [select, setSelect] = useState(value ? value : ''); //выбранное значение из списка
  // option: выбранный элеимнт
  // проверяет есть ли условие для выборки ключа
  // return отдадет label
  const setOptionsLabel = (option) => {
    if (getOptionsLabel) {
      return getOptionsLabel(option);
    }
    return option;
  };
  const [inputValue, setInputValue] = useState(
    value ? setOptionsLabel(value) : ''
  ); //текст внутри инпута
  useEffect(() => {
    if (JSON.stringify(select) === JSON.stringify(value)) {
      return;
    }
    if (value.length === 0) {
      clearValue();
    }
  }, [value]);
  //useEffect запускает (handlerClick) проверку совпадет ли айди с внутренними компонентами если нет то закрывает список
  const selectRef = useRef(null);
  const listenerRef = useRef(null);
  useEffect(() => {
    if (selectRef.current) {
      if (selectRef.current.form) {
        listenerRef.current = selectRef.current.form;
        selectRef.current.form.addEventListener('click', handlerClick);
      }
    }
    document.addEventListener('click', handlerClick);
    return () => {
      if (listenerRef.current) {
        listenerRef.current.removeEventListener('click', handlerClick);
      }
      document.removeEventListener('click', handlerClick);
    };
  }, []);
  //useEffect [open] реагирует на открытие списка и коррестирует значение внутри инпута
  useEffect(() => {
    if (open) {
      firstOpen.current = false;
      return;
    }
    firstOpen.current = true;
    setCorrectValue();
  }, [open]);

  //handlerClick фунекция для useEffect
  const handlerClick = (e) => {
    const currentId = e.target.id;
    if (currentId === idRef) {
      return;
    }
    setOpen(false);
  };
  //корректирует значение в инпуте если не было изменений
  const setCorrectValue = () => {
    if (!select) {
      setInputValue('');
      return;
    }
    if (inputValue !== setOptionsLabel(select)) {
      setInputValue(setOptionsLabel(select));
    }
  };
  //переключает видимость блока списка
  const toggleShow = () => {
    setOpen(!open);
  };
  //фильтр для поиска по списку
  const filterList = (option) => {
    if (options.length === 0) {
      return;
    }
    if (firstOpen.current) {
      return option;
    }
    if (inputValue.length === 0) {
      return option;
    }
    const regExp = new RegExp(inputValue, 'i');
    if (filterOptions) {
      return regExp.test(filterOptions(option));
    }
    if (regExp.test(JSON.stringify(option))) {
      return option;
    }
  };
  //устанавливает значения для всего включая onChange
  const selectValue = (option) => {
    setSelect(option);
    setInputValue(setOptionsLabel(option));
    setOpen(false);
    if (onChange) {
      onChange(option);
    }
  };
  //сравнивает выбранный элемент из списка при совпадении меняет background-color
  const setIsEqual = (option) => {
    return JSON.stringify(select) === JSON.stringify(option);
  };
  //изменения при налоре текста (поиск)
  const handlerChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (inputChange) {
      inputChange(value);
    }
    if (open) {
      return;
    }
    firstOpen.current = false;
    setOpen(true);
  };
  //чистит выбранный элемент и поля
  const clearValue = () => {
    setSelect('');
    setInputValue('');
    if (onChange) {
      onChange('');
    }
    if (inputChange) {
      inputChange('');
    }
  };
  //окрывае/закрывает список
  const handleClickArrow = (e) => {
    if (!open) {
      return;
    }
    e.preventDefault();
    toggleShow();
  };
  return (
    <LabelSelect fullWidth={fullWidth} error={error} ref={selectRef}>
      {label}
      <SelectContainer id={idRef}>
        <SelectInputStyle
          id={idRef}
          value={inputValue}
          onClick={toggleShow}
          onChange={handlerChange}
          placeholder={placeholder || 'Введите'}
          ref={inputRef}
          error={error}
          disabled={disabled}
          $small={small}
        />
        {!disabled && (
          <ButtonWrap>
            {select && (
              <ButtonSelect onClick={clearValue}>
                <Close />
              </ButtonSelect>
            )}
            <ButtonSelect open={open} onClick={handleClickArrow}>
              <ArrowDown />
            </ButtonSelect>
          </ButtonWrap>
        )}
      </SelectContainer>
      <AnimatePresence>
        {open && (
          <SelectItemsContainer
            id={idRef}
            variants={variants}
            initial='hidden'
            exit='hidden'
            animate='vissible'
            $error={error}
          >
            <SelectItems
              options={options.filter(filterList)}
              onClick={selectValue}
              id={idRef}
              isEqual={setIsEqual}
              setOptionsLabel={setOptionsLabel}
              loading={loading}
              getOptionsSubtitle={getOptionsSubtitle}
            />
          </SelectItemsContainer>
        )}
      </AnimatePresence>
      {error?.message && (
        <TextSpanStyle color='red' size={12}>
          {error.message}
        </TextSpanStyle>
      )}
    </LabelSelect>
  );
};

const SelectItemStyle = styled(motion.div)`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $isEqual }) => ($isEqual ? '#84019e4a' : '#fff')};
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: ${({ $isEqual }) =>
      $isEqual ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`;
const SelectItems = ({
  options,
  onClick,
  id,
  isEqual,
  loading,
  setOptionsLabel,
  getOptionsSubtitle,
}) => {
  if (loading) {
    return <SelectItemStyle id={id}>Загрузка...</SelectItemStyle>;
  }
  if (options.length === 0) {
    return (
      <SelectItemStyle id={id}>
        <em>Нет совпадений</em>
      </SelectItemStyle>
    );
  }
  return (
    <>
      {options.map((option, idx) => (
        <SelectItemStyle
          key={idx}
          id={id}
          $isEqual={isEqual(option)}
          onClick={() => onClick(option)}
        >
          {setOptionsLabel(option)}
          {getOptionsSubtitle && (
            <TextSpanStyle size={10} nowrap>
              {getOptionsSubtitle(option)}
            </TextSpanStyle>
          )}
        </SelectItemStyle>
      ))}
    </>
  );
};
