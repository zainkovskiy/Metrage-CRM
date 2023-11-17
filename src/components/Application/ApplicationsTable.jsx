import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'components/Main/Loader';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getMoreApplication } from 'store/applicationSlice';
import { useDateFormat } from 'hooks/DateFormat';

const ApplicationsTableStyle = styled.div`
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
const ApplicationsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonMore, setIsButtonMore] = useState(true);
  const applications = useSelector((state) => state.application.applications);
  const loading = useSelector((state) => state.application.loadingList);
  const loadingMore = useSelector((state) => state.application.loadingMore);

  const more = () => {
    dispatch(getMoreApplication())
      .unwrap()
      .then((data) => {
        if (data?.length < 30) {
          setIsButtonMore(false);
        }
      });
  };
  const navigateTo = (uid) => {
    navigate(`${uid}`);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <ApplicationsTableStyle>
      <TableStyle>
        <TableHeader>
          <tr>
            <th>Номер</th>
            <th>Клиент</th>
            <th>Статус</th>
            <th>Источник</th>
            <th>Создан</th>
            <th>Потребность</th>
            <th>Тип</th>
            <th>Ответственный</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {applications.map((app) => (
              <TableLine
                key={app.UID}
                onClick={() => {
                  navigateTo(app.UID);
                }}
                variants={variants}
                initial='hidden'
                animate='visible'
              >
                <td>{app?.UID}</td>
                <td>{app?.client?.title}</td>
                <td>{app?.status?.title}</td>
                <td>{app?.source?.name}</td>
                <td>{useDateFormat(app?.created, 'DD.MM.YY')}</td>
                <td>{app?.demand?.title}</td>
                <td>{app?.demand?.typePlace}</td>
                <td>{app?.responsible?.title}</td>
              </TableLine>
            ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
      <AnimatePresence>
        {isButtonMore && (
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </ApplicationsTableStyle>
  );
};

export default ApplicationsTable;
