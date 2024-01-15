import React from 'react';
import { SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

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

const SlidePlanEmployes = () => {
  const plan = useAsyncValue();
  const getRowLength = (employ) => {
    let length = employ?.data?.length + 1 || 0;
    employ?.data?.length > 0 &&
      employ.data.map((platform) => {
        length += platform?.category?.length || 0;
      });
    return length;
  };
  return (
    <SliderBlock>
      <SliderTitle>Сотрудники</SliderTitle>
      {plan?.team?.length > 0 ? (
        <TableStyle style={{ width: '100%' }}>
          <TableHeader>
            <tr>
              <th>ФИО:</th>
              <th>Площадка:</th>
              <th>Категория:</th>
              <th>Сейчас:</th>
              <th>План:</th>
              <th>Факт:</th>
            </tr>
          </TableHeader>
          <tbody>
            {plan.team.map((employ) => (
              <React.Fragment key={employ.name}>
                <TableLine>
                  <td
                    rowSpan={getRowLength(employ)}
                    style={{ verticalAlign: 'top' }}
                  >
                    {employ.name}
                  </td>
                </TableLine>
                <AnimatePresence>
                  {employ?.data?.length > 0 &&
                    employ.data.map((platform, idx) => (
                      <React.Fragment key={idx}>
                        <TableLine
                          variants={variants}
                          initial='hidden'
                          animate='visible'
                        >
                          <td
                            rowSpan={
                              platform?.category
                                ? platform.category.length + 1
                                : 0
                            }
                            style={{ verticalAlign: 'top' }}
                          >
                            {platform.platform}
                          </td>
                        </TableLine>
                        <AnimatePresence>
                          {platform?.category?.length > 0 &&
                            platform.category.map((row) => (
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
              </React.Fragment>
            ))}
          </tbody>
        </TableStyle>
      ) : (
        <TextSpanStyle>нет данных по сотрудникам</TextSpanStyle>
      )}
    </SliderBlock>
  );
};

export default SlidePlanEmployes;
