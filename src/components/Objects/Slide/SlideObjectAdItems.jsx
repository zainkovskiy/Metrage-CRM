import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { LinkUI } from 'ui/LinkUI';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  & thead {
    border-bottom: 1px solid #dadada;
  }
  & tr:not(:last-child) {
    border-bottom: 1px solid #dadada;
  }
  & td {
    width: 2%;
    vertical-align: top;
    padding: 0.5rem;
  }
  & th {
    padding: 0.5rem;
  }
`;
const SlideObjectAdItems = () => {
  const object = useAsyncValue();
  if (object?.platform?.length < 1) {
    return (
      <div style={{ marginTop: '0.5rem', width: '100%' }}>
        <TextSpanStyle $fullWidth>Объекта нет в рекламе</TextSpanStyle>
      </div>
    );
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <TextSpanStyle bold size={12}>
              Платформа
            </TextSpanStyle>
          </th>
          <th>
            <TextSpanStyle bold size={12}>
              Примечание
            </TextSpanStyle>
          </th>
        </tr>
      </thead>
      <tbody>
        {object.platform.map((platform, idx) => (
          <tr key={idx}>
            <td>
              <LinkUI href={platform.URL} target='_blank' size={12}>
                {platform.platform}
              </LinkUI>
            </td>
            <td>
              <TextSpanStyle size={12}>
                {platform?.error || 'В рекламе'}
              </TextSpanStyle>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SlideObjectAdItems;
