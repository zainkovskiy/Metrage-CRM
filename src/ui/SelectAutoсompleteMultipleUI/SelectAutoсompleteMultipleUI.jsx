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
  transition: border-color .3s;
  &:has(input:focus){
    border-color: ${({ theme, error }) => error ? 'red' : theme.color.primary};
  }
`
const LabelSelect = styled(LabelStyle)`
  position: relative;
`
const SelectInputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${({ $small }) => $small ? '0.2rem 50px 0.2rem 0.5rem' : '0.5rem 50px 0.5rem 0.5rem'};
  border-radius: 5px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  outline: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => props.type === 'password' ? '1.25px' : ''};
`
const ButtonSelect = styled.div`
  border-radius: 40px;
  padding: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: background-color .3s;
  &:hover{
    background-color: #eee;
  }
  &:active{
    background-color: transparent;
  }
  & > svg {
    pointer-events: none;
    width: 12px;
    height: 12px;
    transition: transform .3s;
    ${({ open }) => open && 'transform: rotate(180deg);'};
  }
`
const ButtonWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0px;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SelectItemsContainer = styled(motion.div)`
  max-height: 250px;
  overflow: auto;
  padding: 0.5rem 0 0 0;
  box-sizing: border-box;
`
const SelectButtons = styled.div`
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e2e2;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-height: 150px;
  overflow: auto;
`
const Suggestions = styled(motion.div)`
  position: absolute;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgb(133, 0, 158);
  z-index: 99;
  top: calc(100% + 10px);
  left: 0px;
  right: 0px;
  padding-bottom: 0.5rem;
`
const variants = {
  vissible: {
    height: 'auto',
    opacity: 1,
  },
  hidden: {
    height: 0,
    opacity: 0,
  }
}

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

export const SelectAutoсompleteMultipleUI = ({
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
  isOpenOptions
}) => {
  const [open, setOpen] = useState(false); //если true показывает список options
  const firstOpen = useRef(true); //при первом открытии списка окрывает полный
  const idRef = useRef(uuidv4().split('-')[0]).current; // айди для всех блоков
  const [select, setSelect] = useState(value ? value : []); //выбранное значение из списка
  // option: выбранный элеимнт
  // проверяет есть ли условие для выборки ключа
  // return отдадет label 
  const setOptionsLabel = (option) => {
    if (option.length === 1) {
      if (getOptionsLabel) {
        return getOptionsLabel(option[0]);
      } else {
        return option;
      }
    }
    if (option.length > 1) {
      return `Выбрано ${option.length}`;
    }
    return ''
  }
  const [inputValue, setInputValue] = useState(setOptionsLabel(value || []));//текст внутри инпута
  //useEffect запускает (handlerClick) проверку совпадет ли айди с внутренними компонентами если нет то закрывает список
  useEffect(() => {
    document.addEventListener('click', handlerClick);
    return () => {
      document.removeEventListener('click', handlerClick)
    }
  }, [])
  //useEffect [open] реагирует на открытие списка и коррестирует значение внутри инпута
  useEffect(() => {
    if(isOpenOptions){
      isOpenOptions(open)
    }
    if (open) {
      firstOpen.current = false;
      return
    }
    firstOpen.current = true;
    setCorrectValue();
  }, [open])

  //handlerClick фунекция для useEffect 
  const handlerClick = (e) => {
    const currentId = e.target.id;
    if (currentId === idRef) { return }
    setOpen(false);
  }
  //корректирует значение в инпуте если не было изменений 
  const setCorrectValue = () => {
    if (!select) {
      setInputValue('');
      return
    }
    if (inputValue !== setOptionsLabel(select)) {
      setInputValue(setOptionsLabel(select));
    }
  }
  //переключает видимость блока списка
  const toggleShow = () => {
    setOpen(!open);
  }
  //устанавливает значения для всего включая onChange
  const selectValue = (option) => {
    const find = select.find((item) => JSON.stringify(item) === JSON.stringify(option));
    if (find) { return }
    setSelect([...select, option]);
    if (onChange) {
      onChange([...select, option]);
    }
  }
  //сравнивает выбранный элемент из списка при совпадении меняет background-color
  const setIsEqual = (option) => {
    const find = select.find((item) => JSON.stringify(item) === JSON.stringify(option));
    return find ? true : false;
  }
  //изменения при налоре текста (поиск)
  const handlerChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (inputChange) {
      inputChange(value)
    }
    if (open) {
      return
    }
    firstOpen.current = false;
    setOpen(true);
  }
  //чистит выбранный элемент и поля
  const clearValue = () => {
    setSelect([]);
    setInputValue('');
    if (onChange) {
      onChange([]);
    }
  }
  //окрывае/закрывает список
  const handleClickArrow = (e) => {
    if (!open) { return }
    e.preventDefault();
    toggleShow();
  }
  const removeButton = (button) => {
    setSelect((prevState) => prevState.filter((item) => JSON.stringify(item) !== JSON.stringify(button)));
    if(onChange){
      onChange(select.filter((item) => JSON.stringify(item) !== JSON.stringify(button)));
    }
  }
  return (
    <LabelSelect fullWidth={fullWidth} error={error}>
      {label}
      <SelectContainer id={idRef} >
        <SelectInputStyle
          id={idRef}
          value={inputValue}
          // onClick={toggleShow}
          // onClick={(e) => {e.preventDefault(), console.log(e.target === document.activeElement)}}
          onChange={handlerChange}
          placeholder={placeholder || 'Выберете'}
          ref={inputRef}
          error={error}
          disabled={disabled}
          $small={small}
          onFocus={() => { setInputValue(''), setOpen(true) }}
          onBlur={() => { }}
        />
        {
          !disabled &&
          <ButtonWrap>
            {
              select.length > 0 &&
              <ButtonSelect
                onClick={clearValue}>
                <Close />
              </ButtonSelect>
            }
            <ButtonSelect
              open={open}
              onClick={handleClickArrow}
            >
              <ArrowDown />
            </ButtonSelect>
          </ButtonWrap>
        }
      </SelectContainer>
      <AnimatePresence>
        {
          open &&
          <Suggestions
            id={idRef}
            variants={variants}
            initial='hidden'
            exit='hidden'
            animate='vissible'
          >
            {
              select.length > 0 &&
              <SelectButtons id={idRef}>
                {
                  select.map((button, idx) => (
                    <SelectButtonsItem
                      key={idx}
                      button={button}
                      getOptionsLabel={getOptionsLabel}
                      id={idRef}
                      removeButton={removeButton}
                    />
                  ))
                }
              </SelectButtons>
            }
            <SelectItemsContainer
              id={idRef}
              $error={error}
            >
              <SelectItems
                options={options}
                onClick={selectValue}
                id={idRef}
                isEqual={setIsEqual}
                getOptionsLabel={getOptionsLabel}
                loading={loading}
                getOptionsSubtitle={getOptionsSubtitle}
              />
            </SelectItemsContainer>
          </Suggestions>
        }
      </AnimatePresence>
      {
        error?.message &&
        <TextSpanStyle color='red' size={12}>{error.message}</TextSpanStyle>
      }
    </LabelSelect>
  );
};
const SelectButtonsItemStyle = styled.div`
  padding: 0.2rem 0.5rem;
  background-color: #e2e2e2;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.font.family};
`
const SelectButtonsItem = ({ button, getOptionsLabel, id, removeButton }) => {
  return (
    <SelectButtonsItemStyle id={id}>
      {getOptionsLabel(button)}
      <ButtonSelect
        onClick={() => removeButton(button)}
        id={id}
      >
        <Close id={id} />
      </ButtonSelect>
    </SelectButtonsItemStyle>
  )
}

const SelectItemStyle = styled(motion.div)`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $isEqual }) => $isEqual ? '#84019e4a' : '#fff'};
  display: flex;
  flex-direction: column;
  &:hover{
    background-color: ${({ $isEqual }) => $isEqual ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`
const SelectItems = ({ options, onClick, id, isEqual, loading, getOptionsLabel, getOptionsSubtitle }) => {
  if (loading) { return <SelectItemStyle id={id}>Загрузка...</SelectItemStyle> }
  if (options.length === 0) {
    return <SelectItemStyle id={id}><em id={id}>No match</em></SelectItemStyle>
  }
  const getLabel = (option) => {
    if (getOptionsLabel) {
      return getOptionsLabel(option)
    }
    return option
  }
  return (
    <>
      {
        options.map((option, idx) => (
          <SelectItemStyle
            key={idx}
            id={id}
            $isEqual={isEqual(option)}
            onClick={() => onClick(option)}
          >
            {getLabel(option)}
            {
              getOptionsSubtitle &&
              <TextSpanStyle size={10} nowrap>{getOptionsSubtitle(option)}</TextSpanStyle>
            }
          </SelectItemStyle>
        ))
      }
    </>
  )
}



