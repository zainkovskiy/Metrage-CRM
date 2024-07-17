import React from 'react';
import BillBlock from './BillBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useNumberTriad } from 'hooks/StringHook';
import * as S from './style';
import { getChartsForBank } from '../../store/slices/ddsSlice';

const BillRemaining = () => {
  const dispatch = useDispatch();
  const { billData } = useSelector((state) => state.dds);

  const getNewCharts = (UID) => {
    dispatch(getChartsForBank(UID));
  };

  return (
    <BillBlock title='Остатки' footer='Баланс:'>
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
              <S.TableLine
                idx={idx}
                key={`bill${line.UID}`}
                onClick={() => {
                  getNewCharts(line.UID);
                }}
              >
                <td>{line.bankName}</td>
                <td>{line.amountDate}</td>
                <td>{useNumberTriad(line.currentAmount)} руб.</td>
              </S.TableLine>
            );
          })}
        </tbody>
      </S.TableStyle>
    </BillBlock>
  );
};

export default BillRemaining;
