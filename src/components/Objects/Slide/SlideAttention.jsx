import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { SliderTitle, SliderBlock } from 'styles/slider';

const Attention = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
`;
const AttentionText = styled(TextSpanStyle)`
  display: inline;
`;
const AttentionTextLine = styled(AttentionText)`
  text-decoration: underline;
`;
const AttentionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #786464;
  padding-top: 0.5rem;
`;
const SlideAttention = ({ onClose }) => {
  return (
    <Attention>
      <SliderTitle>Внимание</SliderTitle>
      <div>
        <AttentionText>В соответствии с правилами </AttentionText>
        <AttentionText color='#84019e'>METRAGE</AttentionText>
        <AttentionText>, для публикации объекта в рекламу, </AttentionText>
        <AttentionTextLine>
          в карточке объекта должен быть указан{' '}
        </AttentionTextLine>
        <AttentionText>
          либо контакт Собственника, либо установлен признак "ФЕЙК"
        </AttentionText>
      </div>
      <AttentionFooter>
        <ButtonUI size='small' onClick={onClose}>
          Закрыть
        </ButtonUI>
      </AttentionFooter>
    </Attention>
  );
};

export default SlideAttention;
