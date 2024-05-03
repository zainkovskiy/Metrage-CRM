import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';
import { useNumberTriad } from 'hooks/StringHook';

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  flex-grow: 1;
`;
const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
const TableHader = styled.thead`
  position: sticky;
  top: 0;
`;
const TableHead = styled.tr`
  background-color: #ccc;
  & > th {
    font-family: ${({ theme }) => theme.font.familyBold};
    padding: 0.3rem;
  }
`;
const TableLine = styled.tr`
  background-color: ${({ idx }) => idx % 2 === 1 && '#e6e6e6'};
  cursor: pointer;
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: rgb(240, 219, 245);
    }
    &:active {
      background-color: rgb(255, 255, 255);
    }
  }
  @media (hover: none) {
    &:active {
      background-color: rgb(240, 219, 245);
    }
  }

  & > td {
    padding: 0.3rem;
  }
`;
const DDSTable = () => {
  const { ddsData } = useSelector((state) => state.dds);
  const navigate = useNavigate();
  const handleClick = (line) => {
    navigate(`${line.UID}`);
  };
  return (
    <TableContainer>
      <TableStyle>
        <TableHader>
          <TableHead>
            {ddsData.recordsTitle.map((headerTitle, idx) => (
              <th key={headerTitle}>{headerTitle || ''}</th>
            ))}
          </TableHead>
        </TableHader>
        <tbody>
          {ddsData?.records?.length > 0 &&
            ddsData?.records.map((line, idx) => (
              <TableLine
                key={line.UID}
                idx={idx}
                onClick={() => handleClick(line)}
              >
                <td>{line.UID}</td>
                <td>{useDateFormat(line.reportDate, 'DD.MM.YYYY')}</td>
                <td>{line.bank}</td>
                <td>{line.category}</td>
                <td>{useNumberTriad(line.coming || 0)} руб.</td>
                <td>{useNumberTriad(line.expens || 0)} руб.</td>
              </TableLine>
            ))}
        </tbody>
      </TableStyle>
    </TableContainer>
  );
};

export default DDSTable;
