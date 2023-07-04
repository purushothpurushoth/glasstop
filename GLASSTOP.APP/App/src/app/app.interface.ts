export const SAVE_USER_URI = '/SaveUserDetails';
export const GET_ROLES_URI = '/GetRoles';
export const GET_GLASSDOOR_INFO = '/GetGlassdoorDetails';
export const GET_GLASSDOOR_RATING = '/GetGlassdoorRating';
export const GET_EMAIL_TEMPLATES = '/GetEmailTemplates';
export const SAVE_EMAIL_TEMPLATES = '/SaveEmailTemplates';
export const GET_EMAIL_DEFAULT_TEMPLATES = '/GetDefaultEmailTemplate';
export const GET_USER_DETAILS = '/GetUserDetails';

export interface IPostAPIRes {
  statusCode?: number;
  statusMessage?: string;
  campaignUserValidation?: any[];
}

export interface IRole {
  roleId: number;
  roleName: string;
  isActive: boolean;
  description: string;
}

export interface IUser {
  provider?: string;
  id?: string;
  email: string;
  name?: string;
  photoUrl?: string;
  firstName: string;
  lastName?: string;
  authToken?: string;
  idToken?: string;
  authorizationCode?: string;
  response?: any;
  companyName?: string;
  roleId?: number;
}

export interface ICampaign {
  campaignName: string;
  ['string']: {
    MailBody: string;
    MailSubject: string;
    SenderEmailId: string;
    MailTemplateId: string;
  };
  companyName?: string;
}

export interface ISaveUserReqBody {
  firstName: string;
  lastName: string;
  companyName: string;
  mail: string;
  roleId: number;
  profilePhoto: string;
}

export interface ICompanyGlassdoorInfoRes {
  responseStatus: number;
  claimedStatus: boolean;
  glassdoorPage: string;
}

export interface IEmailTemplate {
  id: string;
  title: string;
  timeline: {
    desc: string;
    day: string;
  };
  desc: string;
  emailMeta: string;
  companyName: string;
  variables: string[];
  subject: string;
  isSubjectDisabled: boolean;
  body: {
    greeting: string;
    content: string;
    signature: string;
  };
}

export interface IGlassDoorRating {
  overallRating: number;
}

export interface IChip {
  label: string;
  isSelected: boolean;
}

export interface IProfileIconUploadResponse {
  status: boolean;
  image?: string;
}

export interface IMultiFieldModel {
  backdrop: boolean;
  ignoreBackdropClick: boolean;
  class: string;
  modalClass?: string;
  initialState: MultiFieldInitialState;
}

export interface MultiFieldInitialState {
  modelType?: string;
  trueButtonText?: string;
  isIframeVisible?: boolean;
  content?: string;
  title?: string;
  url?: string;
}

export interface DataTableColumn {
  key: string;
  title: string;
  width: number;
  isBold?: boolean;
  isGrey?: boolean;
}

export interface DataTableDetail {
  id: string;
  searchTotalCount: number;
  listName: string;
  placeholder?: string;
}

export interface IEmployee {
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface ICampaignSettings {
  timeZone: string;
  days: string[];
  startTime: string;
  endTime: string;
}

export interface ToastEvent {
  message: string;
  type: string;
}

export interface IHttpErrorResponse {
  status: string;
  message: string;
}

export interface ICompany {
  name?: string;
  id?: string;
  url?: string;
  glassDoorRating?: string;
  glassDoorScreenShot?: string;
  isEngaged?: boolean;
}

export interface BubblePosition {
  top: number;
  left: number;
}
export interface IFeedBackForm {
  starRating: number;
  reviewHeadline: string;
  pros: string;
  cons: string;
  adviceForManagement: string;
}
