import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Table = styled.table`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
const TableTh = styled.th`
  font-family: ${({ theme }) => theme.font.familyBold};
  &:first-child {
    text-align: start;
  }
`;
const TableTd = styled.td`
  text-align: center;
  ${({ $isFilter }) => $isFilter && 'cursor: pointer;'};
  transition: background-color 0.3s;
  &:hover {
    ${({ $isFilter }) => $isFilter && 'background-color: #eee;'};
  }
  &:first-child {
    text-align: start;
  }
`;

const SlideUserTable = ({ header, body, path }) => {
  const navigate = useNavigate();
  const navigateTo = (cell) => {
    if (cell?.filter) {
      navigate(path, { state: { ...cell.filter } });
    }
  };
  return (
    <Table>
      <thead>
        <tr>
          {header.map((title) => (
            <TableTh key={title}>{title}</TableTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((line, idx) => (
          <tr key={idx}>
            {line.map((cell, idx) => (
              <TableTd
                key={`cell${idx}`}
                $isFilter={cell?.filter}
                onClick={() => navigateTo(cell)}
              >
                {cell.value}
              </TableTd>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SlideUserTable;
