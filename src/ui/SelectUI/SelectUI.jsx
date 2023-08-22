import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import React, { Children, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { TextSpanStyle } from 'styles/styles';
import { v4 as uuidv4 } from 'uuid';

const SelectContainer = styled.div`
  position: relative;
`;
const SelectInputContainer = styled.div`
  border: 1px solid transparent;
  position: relative;
  border-radius: 6px;
  &:has(input:focus) {
    border: 1px solid
      ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  }
`;
const SelectInputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${({ $small }) =>
    $small ? '0.2rem 22px 0.2rem 0.5rem' : '0.5rem 22px 0.5rem 0.5rem'};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  outline: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => (props.type === 'password' ? '1.25px' : '')};
  cursor: pointer;
`;
const ArrowStyle = styled(ArrowDown)`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translate(-50%, -50%) rotate(${({ open }) => (open ? 180 : 0)}deg);
  transition: transform 0.3s;
  cursor: pointer;
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
export const SelectUI = ({
  select,
  onChange,
  children,
  label,
  fullWidth,
  inputRef,
  error,
  disabled,
  small,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const idRef = useRef(uuidv4().split('-')[0]).current;
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
  const handlerClick = (e) => {
    const currentId = e.target.id;
    if (currentId === idRef) {
      return;
    }
    setOpen(false);
  };
  const isShow = () => {
    setOpen(!open);
  };
  const getSelectTitle = () => {
    let childrenList = children;
    if (!childrenList) {
      return;
    }
    if (!Array.isArray(childrenList) && childrenList?.type !== React.Fragment) {
      return;
    }
    if (childrenList?.type == React.Fragment) {
      childrenList = childrenList?.props?.children || [];
    }
    const findElem = childrenList.find((item) => item.props.value === select);
    return findElem ? findElem.props.children : '';
  };
  return (
    <LabelStyle fullWidth={fullWidth} ref={selectRef} id={idRef}>
      {label}
      <SelectContainer error={error} id={idRef}>
        <SelectInputContainer id={idRef}>
          <SelectInputStyle
            readOnly
            value={getSelectTitle()}
            onClick={isShow}
            placeholder='Выбрать'
            ref={inputRef}
            error={error}
            disabled={disabled}
            $small={small}
            id={idRef}
          />
          {!disabled && <ArrowStyle open={open} id={idRef} />}
        </SelectInputContainer>
        <AnimatePresence>
          {open && (
            <SelectItemsContainer
              variants={variants}
              initial='hidden'
              exit='hidden'
              animate='vissible'
              $error={error}
              id={idRef}
            >
              {Children.map(
                children?.type === React.Fragment
                  ? children.props.children
                  : children,
                (child) => {
                  return React.cloneElement(child, {
                    ...child.props,
                    select: select,
                    onChange: onChange,
                    id: idRef,
                  });
                }
              )}
            </SelectItemsContainer>
          )}
        </AnimatePresence>
        <TextSpanStyle color='red' size={12} id={idRef}>
          {error?.message && error.message}
        </TextSpanStyle>
      </SelectContainer>
    </LabelStyle>
  );
};

const SelectItemStyle = styled(motion.div)`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $select }) => ($select ? '#84019e4a' : '#fff')};
  &:hover {
    background-color: ${({ $select }) =>
      $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`;
export const SelectItemUI = ({ children, value, select, onChange, id }) => {
  const handleChange = () => {
    onChange(value);
  };
  return (
    <SelectItemStyle
      value={value}
      $select={select === value}
      onClick={handleChange}
      id={id}
    >
      {children}
    </SelectItemStyle>
  );
};
