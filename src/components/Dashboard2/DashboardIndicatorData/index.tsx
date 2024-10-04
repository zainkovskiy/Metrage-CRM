import React, { useState } from 'react';
import * as S from './style';
import TextUI from '../../../uiTs/TextUI';
import { IDashboardPeriod, IDashboardTitleIndicators } from '../type';
import DialogWindow from '../../Main/DialogWindow';
import DashboardWindowFormPeriod from '../DashboardWindowFormPeriod';

interface DashboardIndicatorDataProps {
  period: IDashboardPeriod;
  indicators: IDashboardTitleIndicators;
  setNewPeriod: (data: IDashboardPeriod) => void;
}

const DashboardIndicatorData = (props: DashboardIndicatorDataProps) => {
  const { period, indicators, setNewPeriod } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <S.DashboardIndicatorData>
      <S.DashboardIndicatorButton>
        <TextUI size={12} color='grey'>
          Показатели
        </TextUI>
        <S.DashboardIndicatorBtn onClick={handleOpen} />
        <TextUI size={12} bold>
          {period.periodTypeTitle}
        </TextUI>
      </S.DashboardIndicatorButton>
      {indicators?.length > 0 && (
        <S.DashboardIndicators>
          {indicators.map((indicator, idx) => (
            <React.Fragment key={idx}>
              <TextUI bold>{indicator.title}:</TextUI>
              <div>
                <TextUI bold>{indicator.value}</TextUI>
                {indicator.hasPercent && (
                  <TextUI customColor={indicator.precent.color}>
                    {' '}
                    ({indicator.precent.title})
                  </TextUI>
                )}
              </div>
            </React.Fragment>
          ))}
        </S.DashboardIndicators>
      )}
      <DialogWindow open={open} onClose={handleOpen} disabledClose={true}>
        <DashboardWindowFormPeriod
          onClose={handleOpen}
          period={period}
          setNewPeriod={setNewPeriod}
        />
      </DialogWindow>
    </S.DashboardIndicatorData>
  );
};

export default DashboardIndicatorData;
