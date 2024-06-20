import React, { useEffect } from 'react';
import { useLayer, useMousePositionAsTrigger } from 'react-laag';
import { baseOptions } from './baseOptions';
import * as S from './styled';
import { TextSpanStyle } from '../../styles/styles';

const NestedMenu = ({ items, children, isCheckedOpen, handlerClose }) => {
  const renderItems = (items) => {
    return items.map((item) => {
      return (
        <S.NestedMenuItem
          key={item.key}
          className='menu-item'
          onClick={item.onClick}
        >
          {item.icon && item.icon}
          <TextSpanStyle size={12}>{item.text}</TextSpanStyle>
        </S.NestedMenuItem>
      );
    });
  };
  const {
    hasMousePosition, // did we get a mouse-position from the event-handler
    resetMousePosition, // reset the mouse-position to `null`, essentially closing the menu
    handleMouseEvent, // event-handler we will use below
    trigger, // information regarding positioning we can provide to `useLayer`
  } = useMousePositionAsTrigger();
  useEffect(() => {
    if (handlerClose) {
      handlerClose(hasMousePosition);
    }
  }, [hasMousePosition]);

  const { renderLayer, layerProps } = useLayer({
    isOpen: hasMousePosition,
    onOutsideClick: resetMousePosition,
    trigger,
    ...baseOptions, // shared common options we defined earlier
  });
  return (
    <div
      onContextMenu={(e) => {
        if (isCheckedOpen(e)) {
          handleMouseEvent(e);
        }
      }}
    >
      {hasMousePosition &&
        renderLayer(
          <S.NestedMenu {...layerProps}>
            {renderItems(items(resetMousePosition))}
          </S.NestedMenu>
        )}

      {children}
    </div>
  );
};

export default NestedMenu;
