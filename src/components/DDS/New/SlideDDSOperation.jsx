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
  ${({ $nowrap }) =>
    $nowrap &&
    css`
      white-space: nowrap;
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
      <div style={{ height: 150, overflow: 'auto' }}>
        <S.TableStyle>
          <S.TableHader>
            <S.TableHead>
              <th>Когда</th>
              <th>Что случилось</th>
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
                  <TableTd $color={line?.amountColour} $nowrap>
                    {useNumberTriad(line.amount || 0)} руб.
                  </TableTd>
                </S.TableLine>
              ))}
          </tbody>
        </S.TableStyle>
      </div>
      <S.Line />
      <TextSpanStyle
        align='end'
        size={12}
        color={dds?.operation?.totalAmountColour}
      >
        Баланс: {useNumberTriad(dds?.operation?.totalAmount || 0)} руб.
      </TextSpanStyle>
    </DDSOperation>
  );
};

export default SlideDDSOperation;
