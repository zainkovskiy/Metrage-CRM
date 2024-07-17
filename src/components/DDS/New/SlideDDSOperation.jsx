import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useDateFormat } from 'hooks/DateFormat';
import { useNumberTriad } from 'hooks/StringHook';
import { TextSpanStyle } from 'styles/styles';
import * as S from '../style';

const DDSOperation = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TableTd = styled.td`
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;
const SlideDDSOperation = () => {
  const dds = useAsyncValue();
  return (
    <DDSOperation>
      <SliderTitle>Операции по сделке</SliderTitle>
      <S.TableStyle>
        <S.TableHader>
          <S.TableHead>
            <th>Когда</th>
            <th>Что случилось</th>
            <th>Тип</th>
            <th>Сумма</th>
          </S.TableHead>
        </S.TableHader>
        <tbody>
          {dds?.operation?.items?.length > 0 &&
            dds?.operation?.items.map((line, idx) => (
              <S.TableLine key={`${line.UID}${idx}`} idx={idx}>
                <TableTd>
                  {useDateFormat(line.reportDate, 'DD.MM.YYYY')}
                </TableTd>
                <TableTd $fullWidth>{line.reportResaon}</TableTd>
                <TableTd></TableTd>
                <TableTd $color={line?.amountColour}>
                  {useNumberTriad(line.amount || 0)} руб.
                </TableTd>
              </S.TableLine>
            ))}
        </tbody>
      </S.TableStyle>
      <S.Line />
      <TextSpanStyle
        align='end'
        size={12}
        color={dds?.operation?.totalAmountColour}
      >
        {dds?.operation?.totalAmount}
      </TextSpanStyle>
    </DDSOperation>
  );
};

export default SlideDDSOperation;
