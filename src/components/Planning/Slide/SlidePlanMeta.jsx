import React, { useState } from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { CheckboxUI } from 'ui/CheckboxUI';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import styled from 'styled-components';
import {
  setChiefAccepted,
  setChiefDisAccepted,
  setManagerAccepted,
  setManagerDisAccepted,
} from '../../../api/planApi';
import moment from 'moment';

const SliderBlockMeta = styled(SliderBlock)`
  display: flex;
  justify-content: space-between;
`;

//TODO: Одобрено РОП - любой может тыкать. Утверждено - только isAdmin. Соответственно если утверждено, то все органы управления (кроме галки собственно утверждено) лочатся от изменений

const SlidePlanMeta = ({ setChange }) => {
  const plan = useAsyncValue();
  // const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user?.isAdmin || '');
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?planning=${plan.UID}`
    );
  };
  const handleClick = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    if (id === 'isChiefAccepted') {
      chiefResolve(checked);
    }
    if (id === 'isManagerAccepted') {
      managerResolve(checked);
    }
  };
  const chiefResolve = (checked) => {
    if (checked) {
      setChiefAccepted(plan.UID);
      plan.dateChiefAccepted = moment().format('DD.MM.YYYY');
    } else {
      setChiefDisAccepted(plan.UID);
      plan.dateChiefAccepted = null;
    }
    setChange();
  };

  const managerResolve = (checked) => {
    if (checked) {
      setManagerAccepted(plan.UID);
      plan.dateManagerAccepted = moment().format('DD.MM.YYYY');
    } else {
      plan.dateManagerAccepted = null;
      setManagerDisAccepted(plan.UID);
    }
    plan.isManagerAccepted = checked;
    setChange();
  };
  return (
    <SliderBlockMeta>
      <Box gap='0'>
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {plan.UID}</TextSpanStyle>
      </Box>
      <Box>
        <CheckboxUI
          size='small'
          label={`Одобрено РОП ${plan?.dateChiefAccepted || ''}`}
          labelSize={12}
          defaultChecked={plan?.isChiefAccepted}
          id='isChiefAccepted'
          onChange={handleClick}
          disabled={plan?.isManagerAccepted}
        />
        <CheckboxUI
          size='small'
          label={`Утверждено ${plan?.dateManagerAccepted || ''}`}
          labelSize={12}
          defaultChecked={plan?.isManagerAccepted}
          id='isManagerAccepted'
          onChange={handleClick}
          disabled={isAdmin !== '1'}
        />
      </Box>
    </SliderBlockMeta>
  );
};

export default SlidePlanMeta;
