import React, { useEffect, useState } from 'react';
import { getAutoForm, setAutoForm } from '../../api/chatApi';
import styled, { css } from 'styled-components';
import { SliderTitle } from '../../styles/slider';
import { TextSpanStyle } from '../../styles/styles';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { LinkUI } from '../../ui/LinkUI/LinkUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import Loader from 'components/Main/Loader';
import { motion } from 'framer-motion';

const Autoaction = styled(motion.div)`
  background-color: #fff;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 60vw;
  min-height: 250px;
  @media (max-width: 480px) {
    width: 90vw;
  }
`;
const AutoactionWrap = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  display: flex;
  gap: 0.5rem;
  ${({ $jc }) =>
    $jc &&
    css`
      justify-content: ${$jc};
    `}
  ${({ $ai }) =>
    $ai &&
    css`
      align-items: ${$ai};
    `}
`;
const AutoactionImage = styled.img`
  height: 50px;
`;
const AutoactionAvatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 40px;
`;
const NotificationAutoaction = ({ onClose, UID }) => {
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [curVariable, setCurVariable] = useState('');
  useEffect(() => {
    getDataAutoForm();
  }, []);
  const getDataAutoForm = () => {
    getAutoForm(UID)
      .then((autoData) => {
        setData(autoData);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const changeVariable = (newValue) => {
    setCurVariable(newValue);
  };
  const handleClick = (e) => {
    const id = e.target.id;
    setSend(true);
    setAutoForm({
      UID: data.UID,
      button: id,
      curVariable: curVariable,
    })
      .then((answer) => {
        if (answer === 'OK') {
          onClose();
        }
      })
      .finally(() => {
        setSend(false);
      });
  };
  return (
    <Autoaction onClick={(e) => e.stopPropagation()} layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data?.formTitle && <SliderTitle>{data?.formTitle}</SliderTitle>}
          {data?.formText && (
            <TextSpanStyle bold>{data?.formTitle}</TextSpanStyle>
          )}
          {data?.hasImage && (
            <AutoactionWrap ai='flex-start'>
              <AutoactionImage src={data?.formImage} style={{ height: 50 }} />
              <Box column jc='flex-start' gap='0' ai='flex-start'>
                <TextSpanStyle bold>{data?.formImageTitle}</TextSpanStyle>
                <TextSpanStyle>{data?.formImageText}</TextSpanStyle>
              </Box>
            </AutoactionWrap>
          )}
          {data?.hasUser && (
            <AutoactionWrap $ai='center'>
              <AutoactionAvatar
                src={data?.formUserImage}
                style={{ height: 50 }}
              />
              <TextSpanStyle bold>{data?.formUserTitle}</TextSpanStyle>
            </AutoactionWrap>
          )}
          {data?.hasRouting && (
            <Box jc='flex-end'>
              <LinkUI
                to={`${data?.routing?.entityType}/${data?.routing?.entityId}`}
              >
                {data?.routingTitle}
              </LinkUI>
            </Box>
          )}
          {data?.isMultiple && (
            <SelectUI
              small
              onChange={changeVariable}
              select={curVariable}
              label='Выберите один из следующих вариантов:'
              disabled={send}
            >
              {data?.arrVariables.map((item) => (
                <SelectItemUI key={item?.title} value={item?.title}>
                  {item?.title}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
          {data?.lockedStr && (
            <TextSpanStyle size={12}>{data?.lockedStr}</TextSpanStyle>
          )}
          {!data?.isLocked && (
            <Box>
              <ButtonUI
                fullWidth
                size='small'
                id='decline'
                onClick={handleClick}
                color='error'
                disabled={send}
              >
                {data?.formDeclineTitle}
              </ButtonUI>
              <ButtonUI
                fullWidth
                size='small'
                id='accept'
                onClick={handleClick}
                color='accept'
                disabled={send}
              >
                {data?.formAcceptTitle}
              </ButtonUI>
            </Box>
          )}
          <ButtonUI
            id='cancel'
            size='small'
            variant='outline'
            onClick={handleClick}
            disabled={send}
          >
            Ничего не делать
          </ButtonUI>
        </>
      )}
    </Autoaction>
  );
};

export default NotificationAutoaction;
