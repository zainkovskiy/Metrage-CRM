import React, { useState, Children } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayer } from 'react-laag';
import styled from 'styled-components';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';

const SelectContainer = styled.div``;
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
  /* height: 100px; */
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  max-height: 250px;
  /* overflow: auto; */
  padding: 0.5rem 0;
  box-sizing: border-box;
  ${({ $width }) => $width && `width: ${$width}px`};
  z-index: 999;
`;
const variants = {
  vissible: {
    // height: 'auto',
    opacity: 1,
  },
  hidden: {
    // height: 0,
    opacity: 0,
  },
};
export const SelectLaag = ({
  select,
  onChange,
  children,
  label,
  fullWidth,
  // error,
  disabled,
  small,
  placeholder,
  labelSize,
}) => {
  const [open, setOpen] = useState(false);
  const { renderLayer, layerProps, triggerProps, triggerBounds } = useLayer({
    isOpen: open,
    onOutsideClick: () => closeMenu(),
    onDisappear: () => closeMenu(),
    overflowContainer: false,
    auto: true,
    placement: 'bottom-start',
    possiblePlacements: ['top-start', 'bottom-start'],
    triggerOffset: 10,
  });

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
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <LabelStyle {...triggerProps} fullWidth={fullWidth} labelSize={labelSize}>
      {label}
      <SelectContainer>
        <SelectInputContainer>
          <SelectInputStyle
            readOnly
            value={getSelectTitle()}
            onClick={() => setOpen(!open)}
            placeholder={placeholder || 'Выбрать'}
            disabled={disabled}
            // error={error}
            $small={small}
          />
          {!disabled && <ArrowStyle open={open} />}
        </SelectInputContainer>
        {renderLayer(
          <AnimatePresence>
            {open && (
              <SelectItemsContainer
                {...layerProps}
                variants={variants}
                initial='hidden'
                exit='hidden'
                animate='vissible'
                $width={triggerBounds.width}
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
                      closeMenu: closeMenu,
                      // id: idRef,
                    });
                  }
                )}
              </SelectItemsContainer>
            )}
          </AnimatePresence>
        )}
      </SelectContainer>
    </LabelStyle>
  );
};

const SelectItemStyle = styled(motion.div)`
  padding: 0.5rem;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  cursor: pointer;
  background-color: ${({ $select }) => ($select ? '#84019e4a' : '#fff')};
  &:hover {
    background-color: ${({ $select }) =>
      $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
`;
export const SelectLaagItemUI = ({
  children,
  value,
  select,
  onChange,
  id,
  closeMenu,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
      closeMenu();
    }
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
