import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/table';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';

const ClientTableLine = ({ client }) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`${client.UID}`);
  };
  return (
    <S.TableLine onClick={navigateTo}>
      <td>
        <TextSpanStyle>{client.UID}</TextSpanStyle>
      </td>
      <td>
        <TextSpanStyle>{client?.title}</TextSpanStyle>
      </td>
      <td>
        <TextSpanStyle>
          {useDateFormat(client?.created, 'DD.MM.YY')}
        </TextSpanStyle>
      </td>
      <td>
        <TextSpanStyle>
          {useDateFormat(client?.updated, 'DD.MM.YY')}
        </TextSpanStyle>
      </td>
      <td>
        <TextSpanStyle>{client?.responsible?.title}</TextSpanStyle>
      </td>
      <td>
        <TextSpanStyle>{client?.phone}</TextSpanStyle>
      </td>
    </S.TableLine>
  );
};

export default ClientTableLine;
