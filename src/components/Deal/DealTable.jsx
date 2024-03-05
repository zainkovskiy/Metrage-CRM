import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Loader from 'components/Main/Loader';
import { statusVarinants } from './DealStatus';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { useNumberTriad } from 'hooks/StringHook';
import { useDateFormat } from 'hooks/DateFormat';
import { getDealListMore, setSortFilterName } from '../../store/dealSlice';
import * as DealTableStyle from './styles/dealTable';
import { sortFilter } from './sortFilter';
import { TextSpanStyle } from 'styles/styles';

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const DealTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingMore = useSelector((state) => state.deal.loadingMore);
  const buttonMore = useSelector((state) => state.deal.buttonMore);
  const loading = useSelector((state) => state.deal.loadingList);
  const sortName = useSelector((state) => state.deal.sortName);
  const deals = useSelector((state) => state.deal.deals).slice(0);

  const setSortName = (newSortName) => {
    dispatch(setSortFilterName(newSortName));
  };

  if (loading) {
    return <Loader />;
  }
  const loadMore = () => {
    dispatch(getDealListMore());
  };
  const navigateTo = (uid) => {
    navigate(`${uid}`);
  };
  return (
    <DealTableStyle.DealTableContainer>
      <DealTableStyle.TableStyle>
        <DealTableStyle.TableHeader>
          <tr>
            <DealTableStyle.TableThStyle
              $isButton
              $match={sortName === 'numberUp' || sortName === 'numberDown'}
              onClick={() =>
                setSortName(sortName === 'numberUp' ? 'numberDown' : 'numberUp')
              }
            >
              <div>
                Номер{' '}
                <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'numberDown'}
                  $isSelect={
                    sortName === 'numberUp' || sortName === 'numberDown'
                  }
                />
              </div>
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle
              $isButton
              $match={sortName === 'addressUp' || sortName === 'addressDown'}
              onClick={() =>
                setSortName(
                  sortName === 'addressUp' ? 'addressDown' : 'addressUp'
                )
              }
            >
              <div>
                Адрес{' '}
                <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'addressDown'}
                  $isSelect={
                    sortName === 'addressUp' || sortName === 'addressDown'
                  }
                />
              </div>
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle
              $isButton
              $match={sortName === 'dateUp' || sortName === 'dateDown'}
              onClick={() =>
                setSortName(sortName === 'dateUp' ? 'dateDown' : 'dateUp')
              }
            >
              <div>
                Дата сделки (план)
                <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'dateDown'}
                  $isSelect={sortName === 'dateUp' || sortName === 'dateDown'}
                />
              </div>
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle
            // $isButton
            // $match={sortName === 'dateUp' || sortName === 'dateDown'}
            // onClick={() =>
            //   setSortName(sortName === 'dateUp' ? 'dateDown' : 'dateUp')
            // }
            >
              <div>
                Дата сделки (факт)
                {/* <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'dateDown'}
                  $isSelect={sortName === 'dateUp' || sortName === 'dateDown'}
                /> */}
              </div>
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle>Статус</DealTableStyle.TableThStyle>
            {/* <th>Тип сделки</th>
            <th>Тип недвижимости</th> */}
            <DealTableStyle.TableThStyle>Сумма</DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle>Риелтор</DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle
              $isButton
              $match={sortName === 'lawyerUp' || sortName === 'lawyerDown'}
              onClick={() =>
                setSortName(sortName === 'lawyerUp' ? 'lawyerDown' : 'lawyerUp')
              }
            >
              <div>
                Юрист{' '}
                <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'lawyerDown'}
                  $isSelect={
                    sortName === 'lawyerUp' || sortName === 'lawyerDown'
                  }
                />
              </div>
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle>
              Оплата юристу
            </DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle>Комиссия</DealTableStyle.TableThStyle>
            <DealTableStyle.TableThStyle
            // $isButton
            // $match={sortName === 'dateUp' || sortName === 'dateDown'}
            // onClick={() =>
            //   setSortName(sortName === 'dateUp' ? 'dateDown' : 'dateUp')
            // }
            >
              <div>
                Агент расчитан
                {/* <DealTableStyle.ArrowStyle
                  $isUp={sortName === 'dateDown'}
                  $isSelect={sortName === 'dateUp' || sortName === 'dateDown'}
                /> */}
              </div>
            </DealTableStyle.TableThStyle>
          </tr>
        </DealTableStyle.TableHeader>
        <tbody>
          <AnimatePresence>
            {deals
              .sort((a, b) => sortFilter(a, b, sortName))
              .map((deal) => (
                <DealTableStyle.TableLine
                  key={deal.UID}
                  onClick={() => {
                    navigateTo(deal.UID);
                  }}
                  variants={variants}
                  initial='hidden'
                  animate='visible'
                >
                  <td>
                    <TextSpanStyle size={12}>{deal.UID}</TextSpanStyle>
                  </td>
                  <td>{deal.dealTitle}</td>
                  <td>{useDateFormat(deal?.plannedDate, 'DD.MM.YY')}</td>
                  <td>{useDateFormat(deal?.actualDate, 'DD.MM.YY')}</td>
                  <td>{statusVarinants[deal?.dealStatus]}</td>
                  {/* <td>
                  {deal?.dealType === 'simple' ? 'Обычная' : 'От застройщика'}
                </td>
                <td>
                  {deal?.realtyType === 'live' ? 'Жилая' : 'Коммерческая'}
                </td> */}
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {useNumberTriad(deal?.Price || 0)}
                  </td>
                  <td>{deal.realtor}</td>
                  <td>{deal.lawyerName}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {useNumberTriad(deal?.lawyerPrice || 0)}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {useNumberTriad(deal?.agentPrice || 0)}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {deal?.agentsCalculated ? 'Да' : 'Нет'}
                  </td>
                </DealTableStyle.TableLine>
              ))}
          </AnimatePresence>
        </tbody>
      </DealTableStyle.TableStyle>
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={loadMore} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </DealTableStyle.DealTableContainer>
  );
};

export default DealTable;
