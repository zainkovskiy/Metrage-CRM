import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import { statusVarinants } from './DealStatus';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { useNumberTriad } from 'hooks/StringHook';
import { useDateFormat } from 'hooks/DateFormat';
import { getDealListMore } from '../../store/dealSlice';

const DealTableStyle = styled.div`
  height: 100%;
  overflow: auto;
`;
const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  position: relative;
`;
const TableHeader = styled.thead`
  font-family: ${({ theme }) => theme.font.familyBold};
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  & > tr > th {
    padding: 0.3rem;
  }
`;
const TableLine = styled(motion.tr)`
  cursor: pointer;
  transition: background 0.3s;
  &: hover {
    background: #e6b2f0;
  }
  & > td {
    padding: 0.3rem;
  }
`;

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const DealTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingMore = useSelector((state) => state.deal.loadingMore);
  const buttonMore = useSelector((state) => state.deal.buttonMore);
  const loading = useSelector((state) => state.deal.loadingList);
  const deals = useSelector((state) => state.deal.deals);
  if (loading) {
    return <Loader />;
  }
  const loadMore = () => {
    dispatch(getDealListMore());
  };
  const navigateTo = (uid) => {
    navigate(`${uid}`);
  };
  return (
    <DealTableStyle>
      <TableStyle>
        <TableHeader>
          <tr>
            <th>Номер</th>
            <th>Адрес</th>
            <th>Дата сделки</th>
            <th>Статус</th>
            {/* <th>Тип сделки</th>
            <th>Тип недвижимости</th> */}
            <th>Сумма</th>
            <th>Юрист</th>
            <th>Оплата юристу</th>
            <th>Комиссия</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {deals.map((deal) => (
              <TableLine
                key={deal.UID}
                onClick={() => {
                  navigateTo(deal.UID);
                }}
                variants={variants}
                initial='hidden'
                animate='visible'
              >
                <td>{deal.UID}</td>
                <td>{deal.dealTitle}</td>
                <td>{useDateFormat(deal?.plannedDate, 'DD.MM.YY')}</td>
                <td>{statusVarinants[deal?.dealStatus]}</td>
                {/* <td>
                  {deal?.dealType === 'simple' ? 'Обычная' : 'От застройщика'}
                </td>
                <td>
                  {deal?.realtyType === 'live' ? 'Жилая' : 'Коммерческая'}
                </td> */}
                <td style={{ whiteSpace: 'nowrap' }}>
                  {useNumberTriad(deal?.Price || 0)}
                </td>
                <td>{deal.lawyerName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {useNumberTriad(deal?.lawyerPrice || 0)}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {useNumberTriad(deal?.agentPrice || 0)}
                </td>
              </TableLine>
            ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={loadMore} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </DealTableStyle>
  );
};

export default DealTable;
