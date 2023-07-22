import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { TextSpanStyle } from 'styles/styles';

const SelectContainer = styled.div`
  position: relative;
`
const BorderFocus = styled.span`
`
const SelectInputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${({ $small }) => $small ? '0.2rem 22px 0.2rem 0.5rem' : '0.5rem 22px 0.5rem 0.5rem'};
  border-radius: 5px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  outline: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => props.type === 'password' ? '1.25px' : ''};
  cursor: pointer;
  &:focus + ${BorderFocus}::after{
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    border: 2px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    
  }
  // &:focus{
  //   outline: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  // }
`
const ArrowStyle = styled(ArrowDown)`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%) rotate(${({ open }) => open ? 180 : 0}deg);
  transition: transform .3s;
  cursor: pointer;
`
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
  top: ${({ $error }) => $error ? '100%' : 'calc(100% + 10px)'};
  left: 0;
  right: 0;
  max-height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
  box-sizing: border-box;
`
const variants = {
  vissible: {
    height: 'auto',
  },
  hidden: {
    height: 0,
  }
}
export const SelectAutoCompleteUI = ({ select, onChange, list = [], listName, listValue, label, fullWidth, inputRef, error, disabled, small }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const onClose = () => {
    setOpen(!open);
  }
  const setFilterValue = (e) => {
    const value = e.target.value;
    setFilter(value);
  }
  const filterList = (item) => {
    if (filter.length === 0) {
      return item
    }
    const regExp = new RegExp(filter, 'i');
    if (regExp.test(item[listName])) {
      return item
    }
  }
  const selectValue = (item) => {
    setFilter(item[listName]);
    onChange(item[listValue]);
  }
  return (
    <LabelStyle fullWidth={fullWidth}>
      {label}
      <SelectContainer>
        <SelectContainer>
          <SelectInputStyle
            value={filter}
            onClick={onClose}
            placeholder='Выбрать'
            ref={inputRef}
            error={error}
            disabled={disabled}
            $small={small}
            onChange={setFilterValue}
          />
          <BorderFocus />
          {
            !disabled &&
            <ArrowStyle open={open} />
          }
        </SelectContainer>
        <AnimatePresence>
          {
            open &&
            <SelectItemsContainer
              variants={variants}
              initial='hidden'
              exit='hidden'
              animate='vissible'
              $error={error}
            >
              {
                list.filter(filterList).map((item, idx) => (
                  <SelectItemStyle
                    key={idx}
                    $select={select === item[listValue]}
                    onClick={() => selectValue(item)}
                    value={item[listValue]}>
                    {item[listName]}
                  </SelectItemStyle>
                ))
              }
            </SelectItemsContainer>
          }
        </AnimatePresence>
        <TextSpanStyle color='red' size={12}>{error?.message && error.message}</TextSpanStyle>
      </SelectContainer>
    </LabelStyle>
  );
};


const SelectItemStyle = styled(motion.div)`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $select }) => $select ? '#84019e4a' : '#fff'};
  &:hover{
    background-color: ${({ $select }) => $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`
const SelectItemUI = ({ children, value, select, onChange }) => {
  const handleChange = () => {
    onChange(value);
  }
  return (
    <SelectItemStyle value={value} $select={select === value} onClick={handleChange} >
      {children}
    </SelectItemStyle>
  )
}
