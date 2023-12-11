import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDds } from '../../../api/dealAPI';
import { SliderTitle } from '../../../styles/slider';
import Loader from 'components/Main/Loader';
import closeUrl from 'images/close.svg';
const SlideDialogDDSStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TableContainer = styled.div`
  overflow: auto;
  position: relative;
  width: 100%;
`;
const Table = styled.table`
  width: 100%;
  border: 1px solid #786464;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font.family};
  color: #786464;
  font-size: 12px;
  & td {
    border: 1px solid #786464;
    padding: 0.3rem;
  }
  & th {
    font-family: ${({ theme }) => theme.font.familyBold};
    border: 1px solid #786464;
    padding: 0.3rem;
  }
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const SlideDialogDDS = ({ UID, onClose }) => {
  const [dds, setDds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDDSList();
  }, []);

  const getDDSList = () => {
    getDds(UID)
      .then((data) => {
        setDds(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SlideDialogDDSStyle onClick={(e) => e.stopPropagation()}>
      <SliderTitle>
        ДДС
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SliderTitle>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th rowSpan={2}>Дата</th>
                <th rowSpan={2}>Статья</th>
                <th colSpan={2}>Приход</th>
                <th colSpan={2}>Расход</th>
                <th rowSpan={2}>Примечания</th>
              </tr>
              <tr>
                <th>Нал</th>
                <th>Безнал</th>
                <th>Нал</th>
                <th>Безнал</th>
              </tr>
            </thead>
            <tbody>
              {dds.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.section}</td>
                  <td>{item.comingNal}</td>
                  <td>{item.comingBeznal}</td>
                  <td>{item.expenseNal}</td>
                  <td>{item.expenseBeznal}</td>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </SlideDialogDDSStyle>
  );
};

export default SlideDialogDDS;
