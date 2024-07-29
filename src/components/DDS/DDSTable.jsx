import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import DDSTableLine from './DDSTableLine';

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  flex-grow: 1;
`;
const DDSTable = () => {
  const { ddsData } = useSelector((state) => state.dds);
  const navigate = useNavigate();
  const navigateTo = (line) => {
    navigate(`${line.UID}`);
  };
  return (
    <TableContainer>
      <S.TableStyle>
        <S.TableHader>
          <S.TableHead>
            {ddsData.recordsTitle.map((headerTitle, idx) => (
              <th key={headerTitle?.rusTitle}>{headerTitle?.rusTitle || ''}</th>
            ))}
          </S.TableHead>
        </S.TableHader>
        <tbody>
          {ddsData?.records?.length > 0 &&
            ddsData?.records.map((line, idx) => (
              <DDSTableLine
                key={`${line.UID}${idx}`}
                line={line}
                isLast={ddsData.records.length - 1 === idx}
                navigateTo={navigateTo}
                recordsTitle={ddsData.recordsTitle}
              />
            ))}
        </tbody>
      </S.TableStyle>
    </TableContainer>
  );
};

export default DDSTable;
