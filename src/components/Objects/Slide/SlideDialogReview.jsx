import React from 'react';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { TextSpanStyle } from 'styles/styles';
import { useAsyncValue } from 'react-router-dom';
import { getPrintLink, getReportLink } from '../../../api/objectAPI';

const DialogReview = styled.div`
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const DialogReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
`;
const DialogReviewContext = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow: auto;
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
const OfferImg = styled.img`
  height: 300px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: rgba(0, 0, 0, 0.75) 7px 8px 14px -6px;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: rgba(0, 0, 0, 0.75) 7px 8px 14px -6px;
    }
  }
`;
const SlideDialogReview = ({ onClose }) => {
  const object = useAsyncValue();
  const save = (e) => {
    const source = e.target.id;
    if (source === 'forprint') {
      console.log('forprint');
      getPrintLink({
        UID: object.UID,
        type: object.subTypeEstate,
      }).then((url) => {
        if (url) {
          window.open(url);
        }
      });
    }
    if (source === 'reportseller') {
      console.log('reportseller');
      getReportLink({
        UID: object.UID,
        type: object.subTypeEstate,
      }).then((url) => {
        if (url) {
          window.open(url);
        }
      });
    }
  };
  return (
    <DialogReview onClick={(e) => e.stopPropagation()}>
      <DialogReviewHeader>
        <TextSpanStyle>Выбор отчета</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </DialogReviewHeader>
      <DialogReviewContext>
        <OfferImg
          src='https://crm.metragegroup.com/uploads/contents/demands/reportseller.png'
          id='reportseller'
          onClick={save}
        />
        <OfferImg
          src='https://crm.metragegroup.com/uploads/contents/demands/forprint.png'
          id='forprint'
          onClick={save}
        />
      </DialogReviewContext>
    </DialogReview>
  );
};

export default SlideDialogReview;
