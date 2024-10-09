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
}
interface IIndicators {
  comment: string;
  name: string;
  bigIndex: IDashboardComponentIndex;
  littleIndex: IDashboardComponentIndex;
}
export type ITrandIndicators = IIndicators & {
  trandLine?: string;
};
export type ICounterIndicators = IIndicators & {
  image?: string;
};
export interface IDashboardComponentIndex {
  color: string;
  isPercent: boolean;
  value: number;
}

export type IDashboardTrand = IDashboardComponent & {
  indicators?: ITrandIndicators[];
};
export type IDashboardCounter = IDashboardComponent & {
  indicators?: ICounterIndicators[];
};
export type IDashboardTable = IDashboardComponent & {
  excelURI?: string;
  head?: IDashboardTableHead[];
  table?: IDashboardTableTable[];
};
export type IDashboardGraph<G extends IGraphDefault> = IDashboardComponent & {
  excelURI?: string;
  graphs?: IGraph<G>;
};
export interface IGraph<G> {
  labels?: string[];
  typeChart?: string;
  dataset?: G;
}
export type IGraphDefault = {
  label?: string;
  data?: number[];
};
export type IGraphDoughnut = IGraphDefault & {
  backgroundColor?: string;
};
export type IGraphBar = IGraphDoughnut & {
  borderColor?: string;
};
export interface IDashboardTableHead {
  key: string;
  title: string;
}
export interface IDashboardTableTable {
  [key: string]: string;
}
export type IDashboardComponentProps =
  | IDashboardTrand
  | IDashboardCounter
  | IDashboardTable
  | IDashboardGraph<IGraphDefault>;
