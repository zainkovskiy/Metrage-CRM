import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import { Box } from 'ui/Box';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { useNumberTriad } from 'hooks/StringHook';
import { useDateFormat } from 'hooks/DateFormat';
import { getDealListMore } from '../../store/dealSlice';
import { useGetMeterPrice } from './objectHook';

const ObjectsTableStyle = styled.div`
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

const ObjectsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonMore, setIsButtonMore] = useState(true);
  const loading = useSelector((state) => state.objects.loadingList);
  const loadingMore = useSelector((state) => state.objects.loadingMore);
  const objects = useSelector((state) => state.objects.objects);
  if (loading) {
    return <Loader />;
  }
  const getArea = (object) => {
    if (object?.Area) {
      return object?.Area.split('/')[0];
    }
    return object?.Area || '0';
  };
  const more = () => {
    dispatch(getMoreObjects())
      .unwrap()
      .then((data) => {
        if (data?.length < 50) {
          setIsButtonMore(false);
        }
      });
  };
  const navigateTo = (category, uid) => {
    navigate(`${category}/${uid}`);
  };
  return (
    <ObjectsTableStyle>
      <TableStyle>
        <TableHeader>
          <tr>
            <th>Номер</th>
            <th>Адрес</th>
            <th>Тип сделки</th>
            <th>Тип недвижимости</th>
            <th>Этаж/Площадь</th>
            <th>Цена, руб.</th>
            <th>Ответственный</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {objects.map((object) => (
              <TableLine
                key={object.UID}
                onClick={() => {
                  navigateTo(object?.CategoryOriginal, object.UID);
                }}
                variants={variants}
                initial='hidden'
                animate='visible'
              >
                <td>{object?.UID}</td>
                <td>{object?.addrString || 'Нет адреса'}</td>
                <td>{object?.SubCategory}</td>
                <td>{object?.Category}</td>
                <td>
                  {' '}
                  <Box column gap='0'>
                    {object?.Category !== 'Жил. Уч.' && (
                      <span>{object?.Floors || '1 эт.'}</span>
                    )}
                    <span>
                      {getArea(object)}{' '}
                      {object?.Category === 'Жил. Уч.' ? 'сот.' : 'м2'}
                    </span>
                  </Box>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Box column gap='0'>
                    <span>{useNumberTriad(object?.Price || 0)}</span>
                    <span style={{ fontSize: 10 }}>
                      {useGetMeterPrice(object?.Price, getArea(object))}{' '}
                      {object?.Category === 'Жил. Уч.' ? 'сот.' : 'м2'}
                    </span>
                  </Box>
                </td>
                <td>{object?.Agent}</td>
              </TableLine>
            ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
      <AnimatePresence>
        {isButtonMore && objects.length >= 50 && (
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </ObjectsTableStyle>
  );
};

export default ObjectsTable;
