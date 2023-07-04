import { DataTableColumn, IPostAPIRes } from "src/app/app.interface";

export interface CampaignUserReq {
    companyId?: number | string;
    campaignId?: number | string;
    startRowIndex?: number;
    pageSize?: number;
    searchText?: string;
    transactedBy?: number | string;
    deleteCampaignUserIds?: string;
    isDeleteAll?: boolean;
    campaignEndUser?: CampaignEmployee[];
}

export interface CampaignUserRes extends IPostAPIRes {
  totalCount: number;
  searchTotalCount: number;
  campaignEndUser?: CampaignEmployee[];
}

export interface CampaignEmployee {
    campaignUserId?: number;
    firstName: string;
    lastName: string;
    email: string;
    isSelected?: boolean;
}

// API Constants
export const CAMPAIGN_USER = 'CampaignUser';
export const GET_CAMPAIGN_USER_URI = '/GetCampaignUser';
export const DELETE_CAMPAIGN_USER_URI = '/DeleteCampaignUser';
export const SAVE_CAMPAIGN_USER_URI = '/SaveCampaignUser';

// Static columns for employee list table (Sum of width values should be 90 by considering 10 for checkbox)
export const TABLE_COLUMNS: DataTableColumn[] = [
    {
      key: 'firstName',
      title: 'First name',
      width: 25,
      isBold: true
    },
    {
      key: 'lastName',
      title: 'Last name',
      width: 25,
      isBold: true
    },
    {
      key: 'email',
      title: 'Email',
      width: 40,
      isGrey: true
    }
];
