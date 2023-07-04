using System;
using GLASSTOP.Entity;
using GLASSTOP.DL;

namespace GLASSTOP.BAL
{
    public class CampaignUserBL
    {
        CampaignUserDAL campaignUserDAL = null;

        public CampaignUserBL(string connectionString)
        {
            campaignUserDAL = new CampaignUserDAL(connectionString);
        }

        public CampaignUserResponse SaveCampaignUser(CampaignUser objReq, string timeZone)
        {
            CampaignUserResponse objResp = new CampaignUserResponse();
            try
            {
                objResp = campaignUserDAL.SaveCampaignUser(objReq, timeZone);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }

        public CampaignUser GetCampaignUser(CampaignUser objReq)
        {
            CampaignUser objResp = new CampaignUser();
            try
            {
                objResp = campaignUserDAL.GetCampaignUser(objReq);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }

        public Response DeleteCampaignUser(CampaignUser objReq, string timeZone)
        {
            Response objResp = new Response();
            try
            {
                objResp = campaignUserDAL.DeleteCampaignUser(objReq, timeZone);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }
        public void LogException(Log objLog)
        {
            try
            {
                campaignUserDAL.LogException(objLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
