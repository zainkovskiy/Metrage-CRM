import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDds, removeDDSLine } from '../../../api/dealAPI';
import { SliderTitle } from '../../../styles/slider';
import Loader from 'components/Main/Loader';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
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
const TableLine = styled.tr`
  ${({ $isDeleted }) => $isDeleted && 'text-decoration: line-through;'};
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
  const removeLine = (UID) => {
    removeDDSLine(UID).then((answer) => {
      if (answer === 'OK') {
        setDds(
          dds.map((item) => {
            if (item.UID === UID) {
              return {
                ...item,
                isDeleted: true,
              };
            }
            return item;
          })
        );
      }
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
                <th rowSpan={2}></th>
              </tr>
              <tr>
                <th>Нал</th>
                <th>Безнал</th>
                <th>Нал</th>
                <th>Безнал</th>
              </tr>
            </thead>
            <tbody>
              {dds.map((item) => (
                <TableLine key={item.UID} $isDeleted={item?.isDeleted}>
                  <td>{item.date}</td>
                  <td>{item.section}</td>
                  <td>{item.comingNal}</td>
                  <td>{item.comingBeznal}</td>
                  <td>{item.expenseNal}</td>
                  <td>{item.expenseBeznal}</td>
                  <td>{item.comment}</td>
                  <td>
                    <Box>
                      <IconButton
                        disabled={item?.isDeleted}
                        onClick={() => removeLine(item.UID)}
                        color='error'
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  </td>
                </TableLine>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </SlideDialogDDSStyle>
  );
};

export default SlideDialogDDS;
