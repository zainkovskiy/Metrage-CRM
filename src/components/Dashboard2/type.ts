export interface INote {
  countItems: number;
  hasItems: boolean;
  items: INoteItem[];
  title: string;
  icon: 'bell' | 'mark';
}

export interface INoteItem {
  UID: number;
  action: string;
  actionTitle: string;
  filter: [];
  target: string;
  title: string;
}
export interface IViewer {
  UID: number;
  avatar: string;
  fullName: string;
  officeId: number;
  posititon: string;
  rewards: IRewards[] | [];
  title: string;
}
export interface IRewards {
  title: string;
  picture: string;
}
export interface IMode {
  currentModeTitle: string;
  currentModeType: string;
  currentViewedId: number;
  currentViewedTitle: string;
  currentViewedType: string;
}
export interface IDashboardForm {
  currentModeType: string;
  currentViewedId: number;
  currentViewedType: string;
  isViewerChanger: boolean;
  modes: IDashboardFormMode[];
  offices: IDashboardFormOffice[];
}
export interface IDashboardFormMode {
  UID: number;
  isCurrent: boolean;
  modePicture: string;
  modeTitle: string;
  modeType: string;
}
export type IDashboardFormOffice = {
  UID: number;
  title: string;
};
export type IDashboardFormUser = {
  UID: number;
  fullName: string;
};
export interface IDashboardPeriod {
  periodType: string;
  fromPeriod: string;
  toPeriod: string;
  periodTypeTitle: string;
}
export type IDashboardTitleIndicators = IDashboardPrecent[];

export interface IDashboardPrecent {
  title: string;
  value: string;
  hasPercent: boolean;
  precent: IDashboardPrecentItem;
}
export interface IDashboardPrecentItem {
  title: string;
  color: string;
}
export interface IDashboardInstructions {
  hasInstructions: boolean;
  comment: string;
}
export interface IDashboardComponent {
  titleComponent: string;
  typeComponent: string;
  indicators: IDashboardComponentIndicators[];
}
export interface IDashboardComponentIndicators {
  comment: string;
  name: string;
  bigIndex: IDashboardComponentBigIndex;
  littleIndex: IDashboardComponentLitleIndex;
  image?: string;
  trandLine?: string;
}
export interface IDashboardComponentBigIndex {
  color: string;
  isPercent: boolean;
  value: number;
}
export interface IDashboardComponentLitleIndex
  extends IDashboardComponentBigIndex {}
