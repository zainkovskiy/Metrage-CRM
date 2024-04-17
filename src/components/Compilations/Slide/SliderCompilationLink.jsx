import React from 'react';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { ReactComponent as Link } from 'images/link.svg';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';

const SlideCompilationLinkStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s;
  padding: 0.5rem;
  &:hover {
    background-color: #cfcfcf;
  }
  &:active {
    background-color: #fff;
  }
`;

const LinkStyle = styled(Link)`
  width: 24px;
  height: 24px;
  stroke: ${({ theme }) => theme.color.primary};
`;

const SliderCompilationLink = () => {
  const compilation = useAsyncValue();
  const copyLink = () => {
    if (compilation?.objects?.length === 1) {
      window.open(
        `https://crm.metragegroup.com/one-compilation/${compilation.UID}`
      );
      return;
    }
    window.open(
      `http://crm.metragegroup.com/select-list?id=${compilation.UID}`
    );
  };
  return (
    <SlideCompilationLinkStyle onClick={copyLink}>
      <LinkStyle />
      <TextSpanStyle>Ссылка для клиента</TextSpanStyle>
    </SlideCompilationLinkStyle>
  );
};

export default SliderCompilationLink;
