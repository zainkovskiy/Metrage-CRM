import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from '../../../styles/styles';

const LinkStyle = styled(Link)`
  font-family: ${({ theme }) => theme.font.familyBold};
  text-decoration: none;
  font-size: ${({ $size }) => ($size ? $size + 'px' : '14px')};
  color: #000;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
    & > span {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
const SelectionItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SelectObjectList = styled(motion.ul)`
  padding: 0 0 0 40px;
  overflow: hidden;
`;
const ApplicationSelectionItem = ({ selection }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <SelectionItemHeader>
        <ButtonIcon open={open} onClick={handleClick} />
        <LinkStyle $size={12} to={`/compilation/${selection.UID}`}>
          Подборка от {useDateFormat(selection?.created)}
        </LinkStyle>
      </SelectionItemHeader>
      <SelectObjectList
        variants={{
          closed: { height: 0 },
          open: { height: 'auto' },
        }}
        animate={open ? 'open' : 'closed'}
      >
        {selection?.objects?.length > 0 &&
          selection.objects.map((object) => (
            <li key={object.UID}>
              <LinkStyle to={`/objects/${object.type}/${object.UID}`}>
                <TextSpanStyle size={12}>{object?.addrString}</TextSpanStyle>
                <TextSpanStyle size={10}>
                  {object?.Category}, {object?.TotalArea}м<sup>2</sup>
                </TextSpanStyle>
              </LinkStyle>
            </li>
          ))}
      </SelectObjectList>
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  width: 12px;
  height: 12px;
  cursor: pointer;
  & > svg {
    pointer-events: none;
  }
`;
const PathStyle = styled(motion.path)`
  stroke-width: 3;
  stroke: ${({ theme }) => theme.color.primary};
  stroke-linecap: round;
  pointer-events: none;
`;
const Path = (props) => {
  return <PathStyle {...props} />;
};
const ButtonIcon = ({ open, onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <svg viewBox='0 0 24 24'>
        <Path
          variants={{
            closed: { d: 'M 12 22 L 12 2', opacity: 1 },
            open: { d: 'M 12 12 L 12 12', opacity: 0 },
          }}
          animate={open ? 'open' : 'closed'}
        />
        <Path d='M 2 12 L 22 12' />
      </svg>
    </ButtonContainer>
  );
};

export default ApplicationSelectionItem;
