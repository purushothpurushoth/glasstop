using GLASSTOP.DL;
using GLASSTOP.Entity;

namespace GLASSTOP.BAL
{
    public class GlassdoorInfoBL
    {
        GlassdoorInfoDAL _glassdoorInfoDAL = null;

        public GlassdoorInfoBL(string connectionString)
        {
            _glassdoorInfoDAL = new GlassdoorInfoDAL(connectionString);
        }
        public void LogException(Log objLog)
        {
            try
            {
                _glassdoorInfoDAL.LogException(objLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Response UpdateGlassdoorRating(string companyName, decimal rating, int userId, string timeZone)
        {
            Response objResp = new Response();
            try
            {
                objResp = _glassdoorInfoDAL.UpdateGlassdoorRating(companyName, rating, userId, timeZone);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }

        public Response UpdateGlassdoorUrl(int companyId, string glassdoorUrl, int userId, string timeZone)
        {
            Response objResp = new Response();
            try
            {
                objResp = _glassdoorInfoDAL.UpdateGlassdoorUrl(companyId, glassdoorUrl, userId, timeZone);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }
        public GlassdoorInfo GetGlassdoorUrl(int companyId)        
        {

            GlassdoorInfo objGlassdoorInfo = new GlassdoorInfo();
            try
            {
                objGlassdoorInfo = _glassdoorInfoDAL.GetGlassdoorUrl(companyId);
            }
            catch (Exception ex)
            {
                objGlassdoorInfo.StatusCode = "404";
                throw ex;
            }
            return objGlassdoorInfo;
           
        }
    }
}
