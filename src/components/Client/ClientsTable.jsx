import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Main/Loader';
import * as S from '../../styles/table';
import { AnimatePresence } from 'framer-motion';
import ClientTableLine from './ClientTableLine';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getMoreClientsList } from '../../store/clientsSlice';

const ClientsTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.clients.loading);
  const clients = useSelector((state) => state.clients.clients);
  const loadingMore = useSelector((state) => state.clients.loadingMore);
  const buttonMore = useSelector((state) => state.clients.buttonMore);
  if (loading) {
    return <Loader />;
  }
  const more = () => {
    dispatch(getMoreClientsList());
  };
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
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </S.TableContainer>
  );
};

export default ClientsTable;
