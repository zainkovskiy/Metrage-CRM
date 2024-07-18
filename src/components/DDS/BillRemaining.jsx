import React from 'react';
import BillBlock from './BillBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useNumberTriad } from 'hooks/StringHook';
import * as S from './style';
import { getChartsForBank } from '../../store/slices/ddsSlice';
import styled, { css } from 'styled-components';

const TableLineActive = styled(S.TableLine)`
  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: #98dc90;
    `}
`;

const BillRemaining = () => {
  const dispatch = useDispatch();
  const { billData, bankCharts } = useSelector((state) => state.dds);

  const getNewCharts = (UID) => {
    dispatch(getChartsForBank(UID));
  };

  const totalBalance = () => {
    return billData.reduce((acc, item) => acc + item.currentAmount, 0);
  };
  totalBalance();
  return (
    <BillBlock
      title='Остатки'
      footer={`Баланс: ${useNumberTriad(totalBalance())} руб.`}
      footerColor={totalBalance() > 0 ? 'green' : 'red'}
    >
      <S.TableStyle>
        <S.TableHader>
          <S.TableHead>
            <th>Счёт</th>
            <th>Последняя операция</th>
            <th>Остаток</th>
          </S.TableHead>
        </S.TableHader>
        <tbody>
          {billData.map((line, idx) => {
            return (
              <TableLineActive
                idx={idx}
                key={`bill${line.UID}`}
                $isActive={line?.UID === bankCharts?.bankId}
                onClick={() => {
                  getNewCharts(line.UID);
                }}
              >
                <td>{line.bankName}</td>
                <td>{line.amountDate}</td>
                <td>{useNumberTriad(line.currentAmount)} руб.</td>
              </TableLineActive>
            );
          })}
        </tbody>
      </S.TableStyle>
    </BillBlock>
  );
};

export default BillRemaining;
