import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
import todoUrl, { ReactComponent as Todo } from 'images/todo.svg';
import calendarUrl, {ReactComponent as Calendar} from 'images/calendar.svg';
import usersUrl, {ReactComponent as Users} from 'images/users.svg';
import homeUrl, {ReactComponent as Home} from 'images/home3.svg';
import listUrl, {ReactComponent as List} from 'images/list2.svg';
import dealUrl, {ReactComponent as Deal} from 'images/deal.svg';
import mortgageUrl, {ReactComponent as Mortgage} from 'images/mortgage.svg';
import lawyerUrl, {ReactComponent as Lawyer} from 'images/lawyer.svg';
import gradeUrl, {ReactComponent as Grade} from 'images/grade.svg';
import insuranceUrl, {ReactComponent as Insurance} from 'images/insurance3.svg';
import chartUrl, {ReactComponent as Chart} from 'images/chart.svg';
import hrUrl, {ReactComponent as Hr} from 'images/hr.svg';
import studyUrl, {ReactComponent as Study} from 'images/study.svg';
import phoneUrl, {ReactComponent as Phone} from 'images/phone2.svg';
import headphoneUrl, {ReactComponent as Headphone} from 'images/headphone.svg';

const PanelButtonContainerImgStyle = styled.div`
  padding: 0.5rem;
  border-radius: 20px;
  ${({ active }) => active && 'background: #b269c0'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .3s;
  pointer-events: none;
`
const PanelButtonStyle = styled(Link)`
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
`
const PanelButtonTextStyle = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.primary};
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
`

export const PanelButton = ({ icon, path, title }) => {
  const match = useMatch(path);
  const getPanelIcon = () => {
    return iconVariant[icon];
  }
  const PanelIcon = getPanelIcon();
  return (
    <PanelButtonStyle to={path}>
      <PanelButtonContainerImgStyle active={match}>
        <PanelIcon active={match} />
      </PanelButtonContainerImgStyle>
      <PanelButtonTextStyle>
        {title}
      </PanelButtonTextStyle>
    </PanelButtonStyle>
  );
};
const iconStyle = css`
  width: 24px;
  height: 24px;
  fill: ${({ theme, active }) => active ? theme.color.white : theme.color.primary};
  pointer-event: none;
  transition: fill .3s;
`
const TodoStyle = styled(Todo)`
  ${iconStyle};
`
const CalendarStyle = styled(Calendar)`
  ${iconStyle};
`
const UsersStyle = styled(Users)`
  ${iconStyle};
`
const HomeStyle = styled(Home)`
  ${iconStyle};
`
const ListStyle = styled(List)`
  ${iconStyle};
`
const DealStyle = styled(Deal)`
  ${iconStyle};
`
const MortgageStyle = styled(Mortgage)`
  ${iconStyle};
`
const LawyerStyle = styled(Lawyer)`
  ${iconStyle};
`
const GradeStyle = styled(Grade)`
  ${iconStyle};
`
const InsuranceStyle = styled(Insurance)`
  ${iconStyle};
`
const ChartStyle = styled(Chart)`
  ${iconStyle};
`
const HrStyle = styled(Hr)`
  ${iconStyle};
`
const StudyStyle = styled(Study)`
  ${iconStyle};
`
const HeadphoneStyle = styled(Headphone)`
  ${iconStyle};
`
const PhoneStyle = styled(Phone)`
  ${iconStyle};
`
const iconVariant = {
  todo: TodoStyle,
  calendar: CalendarStyle,
  users: UsersStyle,
  home: HomeStyle,
  list: ListStyle,
  deal: DealStyle,
  mortgage: MortgageStyle,
  lawyer: LawyerStyle,
  grade: GradeStyle,
  insurance: InsuranceStyle,
  chart: ChartStyle,
  hr: HrStyle,
  study: StudyStyle,
  headphone: HeadphoneStyle,
  phone: PhoneStyle,
}
