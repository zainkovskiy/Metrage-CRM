import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
// import { ReactComponent as Todo } from 'images/todo.svg';
import { ReactComponent as Calendar } from 'images/calendar.svg';
// import { ReactComponent as Users } from 'images/users.svg';
// import { ReactComponent as Home } from 'images/home3.svg';
// import { ReactComponent as List } from 'images/list2.svg';
// import { ReactComponent as Deal } from 'images/deal.svg';
import { ReactComponent as Mortgage } from 'images/mortgage.svg';
import { ReactComponent as Lawyer } from 'images/lawyer.svg';
import { ReactComponent as Grade } from 'images/grade.svg';
import { ReactComponent as Insurance } from 'images/insurance3.svg';
import { ReactComponent as Chart } from 'images/chart.svg';
import { ReactComponent as Hr } from 'images/hr.svg';
import { ReactComponent as Study } from 'images/study.svg';
import { ReactComponent as Phone } from 'images/phone2.svg';
// import { ReactComponent as Compilation } from 'images/select.svg';
import { ReactComponent as Headphone } from 'images/headphone.svg';
// import { ReactComponent as Client } from 'images/client.svg';
// import { ReactComponent as News } from 'images/news.svg';
import { ReactComponent as Close } from 'images/close.svg';

import { ReactComponent as Application } from 'images/panel/application.svg';
import { ReactComponent as Objects } from 'images/panel/objects.svg';
import { ReactComponent as Deal } from 'images/panel/deal.svg';
import { ReactComponent as Compilation } from 'images/panel/compilation.svg';
import { ReactComponent as Client } from 'images/panel/client.svg';
import { ReactComponent as Users } from 'images/panel/users.svg';
import { ReactComponent as Task } from 'images/panel/task.svg';
import { ReactComponent as News } from 'images/panel/news.svg';
import { ReactComponent as Residential } from 'images/panel/residential.svg';
import { ReactComponent as Plan } from 'images/panel/plan.svg';
import { ReactComponent as DDS } from 'images/panel/dds.svg';
import { ReactComponent as Fixation } from 'images/panel/fixation.svg';

import { ReactComponent as Mail } from 'images/panel/mail.svg';

const PanelButtonContainerImgStyle = styled.div`
  padding: 0.5rem;
  border-radius: 20px;
  ${({ $active }) => $active && 'background: #b269c0'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  pointer-events: none;
`;
const PanelButtonStyle = styled(Link)`
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  text-decoration: none;
  user-select: none;
  &:hover {
    background-color: #cd96d8;
  }
`;
const PanelButtonLink = styled.a`
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  text-decoration: none;
  user-select: none;
  &:hover {
    background: #cd96d8;
  }
`;
const PanelButtonTextStyle = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.primary};
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
`;

export const PanelButton = ({ icon, path, title, tagName, href, blank }) => {
  const match = useMatch(path || '');
  const getPanelIcon = () => {
    return iconVariant[icon];
  };
  const getPanelButton = () => {
    if (tagName === 'a') {
      return PanelButtonLink;
    }
    return PanelButtonStyle;
  };
  const PanelIcon = getPanelIcon();
  const PanelButtonTag = getPanelButton();
  return (
    <PanelButtonTag
      to={path || ''}
      href={href || ''}
      target={blank && '_blank'}
    >
      <PanelButtonContainerImgStyle $active={path ? match : false}>
        <PanelIcon $active={path ? match : false} />
      </PanelButtonContainerImgStyle>
      <PanelButtonTextStyle>{title}</PanelButtonTextStyle>
    </PanelButtonTag>
  );
};
const iconStyle = css`
  width: 24px;
  height: 24px;
  fill: ${({ theme, $active }) =>
    $active ? theme.color.white : theme.color.primary};
  stroke: ${({ theme, $active }) =>
    $active ? theme.color.white : theme.color.primary};
  pointer-events: none;
  transition: fill 0.3s;
`;
const TaskStyle = styled(Task)`
  ${iconStyle};
`;
const CalendarStyle = styled(Calendar)`
  ${iconStyle};
`;
const UsersStyle = styled(Users)`
  ${iconStyle};
`;
const ObjectsStyle = styled(Objects)`
  ${iconStyle};
`;
const ApplicationStyle = styled(Application)`
  ${iconStyle};
`;
const DealStyle = styled(Deal)`
  ${iconStyle};
`;
const MortgageStyle = styled(Mortgage)`
  ${iconStyle};
`;
const LawyerStyle = styled(Lawyer)`
  ${iconStyle};
`;
const GradeStyle = styled(Grade)`
  ${iconStyle};
`;
const InsuranceStyle = styled(Insurance)`
  ${iconStyle};
`;
const ChartStyle = styled(Chart)`
  ${iconStyle};
`;
const HrStyle = styled(Hr)`
  ${iconStyle};
`;
const StudyStyle = styled(Study)`
  ${iconStyle};
`;
const HeadphoneStyle = styled(Headphone)`
  ${iconStyle};
`;
const PhoneStyle = styled(Phone)`
  ${iconStyle};
`;
const MailStyle = styled(Mail)`
  ${iconStyle};
`;
const ClientStyle = styled(Client)`
  ${iconStyle};
`;
const CompilationStyle = styled(Compilation)`
  ${iconStyle};
`;
const NewsStyle = styled(News)`
  ${iconStyle};
`;
const PlanStyle = styled(Plan)`
  ${iconStyle};
`;
const ResidentialStyle = styled(Residential)`
  ${iconStyle};
`;
const DDSStyle = styled(DDS)`
  ${iconStyle};
`;
const FixationStyle = styled(Fixation)`
  ${iconStyle};
`;
const CloseStyle = styled(Close)`
  ${iconStyle};
`;
const iconVariant = {
  application: ApplicationStyle,
  deal: DealStyle,
  objects: ObjectsStyle,
  compilation: CompilationStyle,
  client: ClientStyle,
  users: UsersStyle,
  task: TaskStyle,
  news: NewsStyle,
  residential: ResidentialStyle,
  planning: PlanStyle,
  dds: DDSStyle,
  fixation: FixationStyle,
  close: CloseStyle,

  calendar: CalendarStyle,
  mortgage: MortgageStyle,
  lawyer: LawyerStyle,
  grade: GradeStyle,
  insurance: InsuranceStyle,
  chart: ChartStyle,
  hr: HrStyle,
  study: StudyStyle,
  headphone: HeadphoneStyle,
  phone: PhoneStyle,
  mail: MailStyle,
};
