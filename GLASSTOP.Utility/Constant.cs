namespace GLASSTOP.Utility
{
    public class Constant
    {
        public const string CONNECTIONSTRING = "GLASSTOPConnection";
        public const string ARGUMENT_EXCEPTION = "Invalid number or type of arguments supplied";
        public static string QUERY_GET_ROLE = "SELECT * FROM public.RoleMaster WHERE IsActive = true";
        public static string QUERY_GET_PAGE_DETAILS = "SELECT Id, PageName, IsActive FROM public.PageNavigationMaster WHERE IsActive = true";
        public const string QUERY_GET_USER = @"SELECT u.UserId,u.FirstName,u.LastName,u.RoleId, u.Email,u.CreatedBy,u.CreatedDate,u.ModifiedBy,
                                                u.ModifiedDate                                           
                                                FROM [dbo].[Users] u WITH(NOLOCK)                                            
                                                WHERE u.IsActive=1";
        //public static string QUERY_GET_PAGE_DETAILS = "SELECT Id, PageName, IsActive FROM dbo.PageNavigationMaster WITH(NOLOCK) WHERE IsActive=1";
       
        public static string QUERY_GET_MAILTEMPLATES = "SELECT TemplateId,TemplateName,EmailMeta FROM MailTemplatesMaster WHERE IsActive = true";

        public const string COLUMN_STATUSCODE = "StatusCode";
        public const string COLUMN_STATUSMESSAGE = "StatusMessage";

        public const string COLUMN_USERID = "UserId";
        public const string COLUMN_ROLEID = "RoleId";
        public const string COLUMN_USERNAME = "UserName";
        public const string COLUMN_FIRSTNAME = "FirstName";
        public const string COLUMN_LASTNAME = "LastName";
        public const string COLUMN_COMPANYNAME = "CompanyName";
        public const string COLUMN_EMAIL = "Email";    
        public const string COLUMN_ISACTIVE = "IsActive";       
        public const string COLUMN_ROLE_NAME = "RoleName";
        public const string COLUMN_DESCRIPTION = "Description";
        public const string COLUMN_COMPANYID = "CompanyId";
        public const string COLUMN_PROFILEPHOTO = "ProfilePhoto";
        public const string COLUMN_TOTALCOUNT = "TotalCount";
        public const string COLUMN_PAGEID = "Id";
        public const string COLUMN_PAGENAME = "PageName";
        public const string COLUMN_NAVIGATIONPAGEID = "UserNavigationPageId";
        public const string COLUMN_SEARCHTOTALCOUNT = "SearchTotalCount";

        //exception log
        public const string SYSTEM_USER = "System";
        public const string PARAM_MODULE = "p_Module";
        public const string PARAM_EXCEPTION = "p_Exception";
        public const string PARAM_TRANSACT_BY = "p_Transacted_By";
        public const string PARAM_TRANSACTED_DATE = "p_Transacted_Date";

        //public const string SYSTEM_USER = "System";
        //public const string PARAM_MODULE = "@Module";
        //public const string PARAM_EXCEPTION = "@Exception";
        //public const string PARAM_TRANSACT_BY = "@Transacted_By";
        //public const string PARAM_TRANSACTED_DATE = "@Transacted_Date";

        public const string PARAM_CAMPAIGN_USERIDS = "@CampaignUserIds";
        public const string PARAM_CAMPAIGN_ID = "@CampaignId";
        public const string PARAM_START_ROW_INDEX = "@StartRowIndex";
        public const string PARAM_PAGESIZE = "@PageSize";
        public const string PARAM_ISDELETEALL = "@IsDeteleAll";
        public const string PARAM_SEARCHTEXT= "@SearchText";
        public const string PARAM_NAVIGATION_ID = "@UserNavigationId";

        //Parameter
        public const string PARAM_USERNAME = "@UserName";
        public const string PARAM_FIRSTNAME = "@FirstName";
        public const string PARAM_LASTNAME = "@LastName";
        public const string PARAM_ISACTIVE = "@IsActive";
        public const string PARAM_EMAIL = "@Email";
        public const string PARAM_USER_ROLES = "@RoleId";
        public const string PARAM_USER_PHOTO = "@ProfilePhoto";
        public const string PARAM_USER_COMPANYNAME = "@CompanyName";

        public const string PARAM_GLASSDOORAPI_VERSION = "1";
        public const string PARAM_GLASSDOORAPI_PARTNERID = "102567";
        public const string PARAM_GLASSDOORAPI_PARTNERKEY = "bEJk395y8Qe";
        public const string PARAM_GLASSDOORAPI_RESPONSEFORMAT = "json";


        //Stored Procedure
        public const string SP_TRANSACT_GETUSERDETAILS = "select * from test";
        //public const string SP_TRANSACT_GETUSERDETAILS = "[dbo].[GetUserDetails]";
        public const string SP_LOG_EXCEPTION = "test";

        public const string SP_TRANSACT_USERS = "[dbo].[TransactUser]";
        //public const string SP_TRANSACT_GETUSERDETAILS = "[dbo].[GetUserDetails]";
        //public const string SP_LOG_EXCEPTION = "[dbo].[LogException]";
        public static string SP_SAVE_EMAILTEMPLATE = "[dbo].[SaveEmailTemplate]";
        public static string SP_SAVE_CAMPAIGNUSER = "[dbo].[SaveCampaignUser]";
        public static string SP_GET_CAMPAIGNUSER = "[dbo].[GetCampaignUser]";
        public static string SP_DELETE_CAMPAIGNUSER = "[dbo].[DeleteCampaignUser]";
        public static string SP_SAVE_JOBSSHEDULER = "[dbo].[SaveJobsScheduler]";
        public static string SP_GETEMAILTEMPLATES = "[dbo].[GetEmailTemplates]";
        public static string SP_UPDATEUSERNAVIGATION = "[dbo].[UpdateUserNavigation]";

        //EmailTemplate Parameter

        public const string PARAM_CAMPAIGNNAME = "@CampaignName";
        public const string PARAM_MAILTEMPLATEID1= "@MailTemplateId1";
        public const string PARAM_MAILTEMPLATEID2= "@MailTemplateId2";
        public const string PARAM_MAILTEMPLATEID3 = "@MailTemplateId3";
        public const string PARAM_MAILSUBJECT1 = "@MailSubject1";
        public const string PARAM_MAILSUBJECT2 = "@MailSubject2";
        public const string PARAM_MAILSUBJECT3 = "@MailSubject3";
        public const string PARAM_MAILBODY1 = "@MailBody1";
        public const string PARAM_MAILBODY2 = "@MailBody2";
        public const string PARAM_MAILBODY3 = "@MailBody3";
        public const string PARAM_SENDERMAILID1 = "@SenderEmailId1";
        public const string PARAM_SENDERMAILID2 = "@SenderEmailId2";
        public const string PARAM_SENDERMAILID3 = "@SenderEmailId3";
        public const string PARAM_COMPANYID = "@CompanyId";
        public const string PARAM_REMARKS = "@Remarks";

        public const string PARAM_CAMPAIGNID = "@CampaignId";
        public const string PARAM_SCHEDULEDAY = "@ScheduleDay";
        public const string PARAM_TIMEZONE = "@TimeZone";
        public const string PARAM_STRATTIME = "@StartTime";
        public const string PARAM_MAILTEMPLATEID = "TemplateId";
        public const string PARAM_MAILTEMPLATENAME = "TemplateName";
        public const string PARAM_MAILMETA = "EmailMeta";


    }
}
