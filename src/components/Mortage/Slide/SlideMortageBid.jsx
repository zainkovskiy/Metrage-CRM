import React from 'react';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { ButtonLink } from 'ui/ButtonLink';

const MortageBid = styled.div`
  background-color: #ececec;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MortageBidWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 0.2rem;
`;

const SlideMortageBid = ({ bid, openWindowBid }) => {
  const { mortgageCreate } = useSelector((state) => state.user);
  const openEditBid = () => {
    openWindowBid(bid);
  };
  return (
    <MortageBid>
      {mortgageCreate && (
        <ButtonLink size={12} color='rgb(28 155 248)' onClick={openEditBid}>
          Редактировать
        </ButtonLink>
      )}
      <MortageBidWrap>
        <TextSpanStyle size={12}>Банк: {bid.bank}</TextSpanStyle>
        <TextSpanStyle size={12}>
          Дата отправки: {useDateFormat(bid.dateOfSend, 'DD.MM.YYYY')}
        </TextSpanStyle>
        <TextSpanStyle size={12}>Сумма кредита: {bid.summ}</TextSpanStyle>
        <TextSpanStyle size={12}>ПВ: {bid.PV}</TextSpanStyle>
        <TextSpanStyle size={12}>
          Статус: {bid.stage} {useDateFormat(bid.stageDate, 'DD.MM.YYYY')}
        </TextSpanStyle>
      </MortageBidWrap>
    </MortageBid>
  );
};

export default SlideMortageBid;
