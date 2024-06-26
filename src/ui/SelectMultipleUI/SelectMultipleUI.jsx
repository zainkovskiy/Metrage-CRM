import React, { Children, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import styled from 'styled-components';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { TextSpanStyle } from 'styles/styles';
import { v4 as uuidv4 } from 'uuid';

const LabelStyleSelect = styled(LabelStyle)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '178px')};
`;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #fff;
  ${({ value }) => value === 'Выбрать' && 'color: #757575;'};
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
export const SelectMultipleUI = ({
  value,
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
  const formRef = useRef(null);
  useEffect(() => {
    const form = document.getElementsByTagName('form');
    Array.from(form).forEach((item) => {
      // if (item.querySelector(`.input${idRef}`)) {
      //   formRef.current = item;
      // }
      if (document.querySelector(`input[id='${idRef}']`)) {
        formRef.current = item;
      }
    });
    if (formRef.current) {
      formRef.current.addEventListener('click', handlerClick);
    }
    document.addEventListener('click', handlerClick);
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('click', handlerClick);
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
      return 'Выбрать';
    }
    if (!Array.isArray(childrenList) && childrenList?.type !== React.Fragment) {
      return 'Выбрать';
    }
    if (childrenList?.type == React.Fragment) {
      childrenList = childrenList?.props?.children || [];
    }
    if (value.length === 0) {
      return 'Выбрать';
    }
    let inputText = '';
    value.forEach((element) => {
      const find = childrenList.find((elem) => elem.props.value === element);
      if (find) {
        inputText += `${find.props.children}, `;
      }
    });
    return inputText.replace(/, \s*$/, '');
  };
  const handleChange = (currentValue) => {
    if (!currentValue) {
      return;
    }
    let newValue = value.map((item) => item);
    if (newValue.includes(currentValue)) {
      newValue.splice(newValue.indexOf(currentValue), 1);
    } else {
      newValue.push(currentValue);
    }
    onChange && onChange(newValue);
  };
  return (
    <LabelStyleSelect fullWidth={fullWidth} id={idRef}>
      {label}
      <SelectContainer error={error} id={idRef}>
        <SelectInputContainer id={idRef}>
          <SelectInputStyle
            readOnly
            onClick={isShow}
            error={error}
            disabled={disabled}
            $small={small}
            id={idRef}
            // className={`input${idRef}`}
            value={getSelectTitle()}
            ref={inputRef}
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
              name={idRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {Children.map(
                children?.type === React.Fragment
                  ? children.props.children
                  : children,
                (child) => {
                  return React.cloneElement(child, {
                    ...child.props,
                    select: value.includes(child.props.value),
                    onChange: handleChange,
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
    </LabelStyleSelect>
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
export const SelectMultipleItemUI = ({
  children,
  value,
  select,
  onChange,
  id,
}) => {
  const handleChange = () => {
    onChange(value);
  };
  return (
    <SelectItemStyle
      value={value}
      $select={select}
      onClick={(e) => {
        e.preventDefault();
        handleChange();
      }}
      id={id}
    >
      {children}
    </SelectItemStyle>
  );
};
