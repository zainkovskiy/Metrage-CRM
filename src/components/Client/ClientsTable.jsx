import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'components/Main/Loader';
import * as S from '../../styles/table';
import { AnimatePresence } from 'framer-motion';
import ClientTableLine from './ClientTableLine';

const ClientsTable = () => {
  const loading = useSelector((state) => state.clients.loading);
  const clients = useSelector((state) => state.clients.clients);
  if (loading) {
    return <Loader />;
  }
  return (
    <S.TableContainer>
      <S.TableStyle>
        <S.TableHeader>
          <tr>
            <S.TableThStyle>Номер</S.TableThStyle>
            <S.TableThStyle>Имя</S.TableThStyle>
            <S.TableThStyle>Дата создания</S.TableThStyle>
            <S.TableThStyle>Дата изменения</S.TableThStyle>
            <S.TableThStyle>Ответственный</S.TableThStyle>
            <S.TableThStyle>Телефон</S.TableThStyle>
          </tr>
        </S.TableHeader>
        <tbody>
          <AnimatePresence>
            {clients.map((client) => (
              <ClientTableLine client={client} key={client.UID} />
            ))}
          </AnimatePresence>
        </tbody>
      </S.TableStyle>
    </S.TableContainer>
  );
};

export default ClientsTable;
