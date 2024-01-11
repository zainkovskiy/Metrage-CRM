import React from 'react';
import { SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
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

const SlidePlanPlatform = ({ platform }) => {
  return (
    <>
      <SliderTitle>{platform.platformName}</SliderTitle>
      <TableStyle style={{ width: '100%' }}>
        <TableHeader>
          <tr>
            <th>Регион:</th>
            <th>Категория:</th>
            <th>Сейчас:</th>
            <th>План:</th>
            <th>Факт:</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {platform?.data?.length > 0 &&
              platform.data.map((region, idx) => (
                <React.Fragment key={idx}>
                  <TableLine
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                  >
                    <td
                      rowSpan={region?.data ? region.data.length + 1 : 0}
                      style={{ verticalAlign: 'top' }}
                    >
                      {region.regName}
                    </td>
                  </TableLine>
                  <AnimatePresence>
                    {region?.data?.length > 0 &&
                      region.data.map((row) => (
                        <TableLine
                          key={row.catName}
                          variants={variants}
                          initial='hidden'
                          animate='visible'
                        >
                          <td>{row.catName}</td>
                          <td>{row.current}</td>
                          <td>{row.plan}</td>
                          <td>{row.fact}</td>
                        </TableLine>
                      ))}
                  </AnimatePresence>
                </React.Fragment>
              ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
    </>
  );
};

export default SlidePlanPlatform;
