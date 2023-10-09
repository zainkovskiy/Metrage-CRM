import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { TextSpanStyle } from 'styles/styles';
import SlideDialogAdSkeleton from './SlideDialogAdSkeleton';
import { getPublication, setPublication } from 'api/objectAPI';

const SlideDialogAdStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  min-width: 300px;
`;
const SlideDialogAdHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const OfficeListStyle = styled.div`
  // overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  heigth: 200px;
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
const Line = styled.span`
  height: 1px;
  background-color: #ccc;
`;

const SlideDialogAd = ({ onClose, UID, estate }) => {
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState(null);
  const [checkboxExpired, setCheckboxExpired] = useState({});
  useEffect(() => {
    getAdList();
  }, []);
  const getAdList = async () => {
    try {
      const res = await getPublication(UID, estate);
      setAd(res);
      setCheckboxExpired({
        avito: res?.avitoPromo?.expired ? true : false,
        cian: res?.cianPromo?.expired ? true : false,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const id = e.target.id;
    const type = e.target.type;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setAd((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const setExpired = (e, key) => {
    const id = e.target.id;
    const value = e.target.value;

    setAd((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], expired: value },
    }));
  };
  const isCheckboxExpired = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;

    setCheckboxExpired((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
    if (!checked) {
      const promo = id === 'cian' ? 'cianPromo' : 'avitoPromo';
      setAd((prevState) => ({
        ...prevState,
        [promo]: { ...prevState[promo], expired: '' },
      }));
    }
  };
  const saveAd = () => {
    setPublication(UID, estate, ad).then((res) => {
      res === 'OK' && onClose();
    });
  };
  return (
    <SlideDialogAdStyle onClick={(e) => e.stopPropagation()}>
      <SlideDialogAdHeaderStyle>
        <TextSpanStyle bold>Реклама до:</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogAdHeaderStyle>
      {loading ? (
        <SlideDialogAdSkeleton />
      ) : (
        <OfficeListStyle>
          <Box jc='space-between'>
            <CheckboxUI
              id='onCian'
              label='ЦИАН'
              defaultChecked={ad?.onCian}
              onChange={handleChange}
            />
            <InputUI
              id='cianDate'
              type='date'
              disabled={true}
              small
              hidden
              value={ad?.cianDate || ''}
            />
          </Box>
          <Box jc='space-between'>
            <CheckboxUI
              id='cian'
              label='Продвижение до'
              defaultChecked={checkboxExpired.cian}
              onChange={isCheckboxExpired}
              disabled={!(ad?.cianPromo?.active && ad?.onCian)}
            />
            <InputUI
              id='cianPromo'
              type='date'
              disabled={
                !(ad?.cianPromo?.active && checkboxExpired.cian && ad?.onCian)
              }
              small
              value={ad?.cianPromo?.expired || ''}
              onChange={setExpired}
            />
          </Box>
          <Line />
          <Box jc='space-between'>
            <CheckboxUI
              id='onAvito'
              label='Авито'
              defaultChecked={ad?.onAvito}
              onChange={handleChange}
            />
            <InputUI
              id='avitoDate'
              type='date'
              disabled={!ad?.onAvito}
              small
              value={ad?.avitoDate || ''}
              onChange={handleChange}
            />
          </Box>
          <Box jc='space-between'>
            <CheckboxUI
              id='avito'
              label='Продвижение до'
              defaultChecked={checkboxExpired.avito}
              onChange={isCheckboxExpired}
              disabled={!(ad?.avitoPromo?.active && ad?.onAvito)}
            />
            <InputUI
              id='avitoPromo'
              type='date'
              disabled={
                !(
                  ad?.avitoPromo?.active &&
                  checkboxExpired.avito &&
                  ad?.onAvito
                )
              }
              small
              value={ad?.avitoPromo?.expired || ''}
              onChange={setExpired}
            />
          </Box>
          <Line />
          <Box jc='space-between'>
            <CheckboxUI
              id='onDomclick'
              label='Домклик'
              defaultChecked={ad?.onDomclick}
              onChange={handleChange}
            />
            {/* <InputUI
              id='domclickDate'
              type='date'
              disabled={true}
              small
              value={ad?.domclickDate || ''}
            /> */}
          </Box>
          <Line />
          <Box jc='space-between'>
            <CheckboxUI
              id='onYandex'
              label='Яндекс'
              defaultChecked={ad?.onYandex}
              onChange={handleChange}
            />
            {/* <InputUI
              id='yandexDate'
              type='date'
              disabled={true}
              small
              value={ad?.yandexDate || ''}
            /> */}
          </Box>
          <Line />
          <Box jc='space-between'>
            <CheckboxUI
              id='onOther'
              label='Остальные'
              defaultChecked={ad?.onOther}
              onChange={handleChange}
            />
            {/* <InputUI
              id='otherDate'
              type='date'
              disabled={true}
              small
              value={ad?.otherDate || ''}
            /> */}
          </Box>
        </OfficeListStyle>
      )}
      <Box jc='flex-start'>
        <ButtonUI onClick={onClose} variant='outline'>
          Отменить
        </ButtonUI>
        <ButtonUI onClick={saveAd}>Сохранить</ButtonUI>
      </Box>
    </SlideDialogAdStyle>
  );
};

export default SlideDialogAd;
