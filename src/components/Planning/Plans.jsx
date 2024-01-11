import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'components/Main/Loader';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDateFormat } from 'hooks/DateFormat';
import { useNavigate } from 'react-router-dom';

const PlansStyle = styled.div`
  padding: 0.5rem;
`;
const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  position: relative;
  background-color: #fff;
`;
const TableHeader = styled.thead`
  font-family: ${({ theme }) => theme.font.familyBold};
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  & > tr > th {
    padding: 0.3rem;
  }
`;
const TableLine = styled(motion.tr)`
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e6b2f0;
  }
  & > td {
    padding: 0.3rem;
    text-align: center;
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

const Plans = () => {
  const navigate = useNavigate();
  const loadingList = useSelector((state) => state.plans.loadingList);
  const plans = useSelector((state) => state.plans.plans);
  if (loadingList) {
    return <Loader />;
  }
  const navigateTo = (UID) => {
    navigate(`${UID}`);
  };
  return (
    <PlansStyle>
      <TableStyle>
        <TableHeader>
          <tr>
            <th>Номер</th>
            <th>Офис</th>
            <th>План</th>
            <th>Создано</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {plans.map((plan) => (
              <TableLine
                key={plan.UID}
                onClick={() => {
                  navigateTo(plan.UID);
                }}
                variants={variants}
                initial='hidden'
                animate='visible'
              >
                <td>{plan?.UID}</td>
                <td>{plan?.officeName}</td>
                <td>{plan?.planDate}</td>
                <td>{useDateFormat(plan?.created, 'DD.MM.YY')}</td>
              </TableLine>
            ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
    </PlansStyle>
  );
};

export default Plans;
