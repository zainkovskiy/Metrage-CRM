import React from 'react';
import bookUrl, { ReactComponent as Book } from 'images/book.svg';
import heartUrl, { ReactComponent as Heart } from 'images/heart.svg';
import chatUrl, { ReactComponent as Chat } from 'images/chat.svg';
import userUrl, { ReactComponent as User } from 'images/user.svg';
import { ReactComponent as Basket } from 'images/basket.svg';
import { ReactComponent as BasketFull } from 'images/basket-loaded.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import { ReactComponent as Cut } from 'images/cut.svg';
import { ReactComponent as ArrowBack } from 'images/arrow-around-left.svg';
import { ReactComponent as ArrowRepeat } from 'images/arrow-around-right.svg';
import { ReactComponent as Stamp } from 'images/stamp.svg';
import { ReactComponent as Brush } from 'images/brush.svg';
import { ReactComponent as Gagarin } from 'images/gagarin.svg';
import styled, { css } from 'styled-components';

const IconButtonSimpleStyle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
const EditStyle = styled(Edit)`
  ${iconStyle};
`;
const CutStyle = styled(Cut)`
  ${iconStyle};
`;
const ArrowBackStyle = styled(ArrowBack)`
  ${iconStyle};
`;
const ArrowRepeatStyle = styled(ArrowRepeat)`
  ${iconStyle};
`;
const BrushStyle = styled(Brush)`
  ${iconStyle};
`;
const StampStyle = styled(Stamp)`
  ${iconStyle};
`;
const GagarinStyle = styled(Gagarin)`
  ${iconStyle};
`;

export const IconButtonSimple = (props) => {
  const { icon } = props;
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
  edit: EditStyle,
  cut: CutStyle,
  back: ArrowBackStyle,
  repeat: ArrowRepeatStyle,
  brush: BrushStyle,
  stamp: StampStyle,
  gagarin: GagarinStyle,
};
