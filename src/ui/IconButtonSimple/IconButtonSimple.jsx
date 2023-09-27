import React from 'react';
import bookUrl, { ReactComponent as Book } from 'images/book.svg';
import heartUrl, { ReactComponent as Heart } from 'images/heart.svg';
import chatUrl, { ReactComponent as Chat } from 'images/chat.svg';
import userUrl, { ReactComponent as User } from 'images/user.svg';
import { ReactComponent as Basket } from 'images/basket.svg';
import { ReactComponent as BasketFull } from 'images/basket-loaded.svg';
import styled, { css } from 'styled-components';

const IconButtonSimpleStyle = styled.div`
  cursor: pointer;
  border: ${({ border }) =>
    border ? border : '1px solid ${({ theme }) => theme.color.primary};'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 5px;
  transition: transform 0.3s;
  @media (hover: none) {
    &:active {
      transform: scale(1.3);
    }
  }
  @media (hover: hover) {
    &:hover {
      transform: scale(1.3);
    }
    &:active {
      transform: scale(1);
    }
  }
`;
const iconStyle = css`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.color.primary};
  pointer-events: none;
`;
const BookStyle = styled(Book)`
  ${iconStyle};
`;
const HeartStyle = styled(Heart)`
  ${iconStyle};
`;
const ChatStyle = styled(Chat)`
  ${iconStyle};
`;
const UserStyle = styled(User)`
  ${iconStyle};
`;
const BasketStyle = styled(Basket)`
  ${iconStyle};
`;
const BasketFullStyle = styled(BasketFull)`
  ${iconStyle};
`;

export const IconButtonSimple = (props) => {
  const { icon, border } = props;
  const getIconButton = () => {
    return iconVariant[icon];
  };
  const IconButton = getIconButton();
  return (
    <IconButtonSimpleStyle {...props}>
      <IconButton />
    </IconButtonSimpleStyle>
  );
};

const iconVariant = {
  book: BookStyle,
  heart: HeartStyle,
  chat: ChatStyle,
  user: UserStyle,
  basket: BasketStyle,
  basketFull: BasketFullStyle,
};
