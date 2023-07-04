using System.Data;
using GLASSTOP.Utility;
using GLASSTOP.Entity;
using static GLASSTOP.Utility.Utils;
using System.Text.Json;

namespace GLASSTOP.DL
{
    public class GlassdoorInfoDAL
    {
        private DBManager _dbManager = null;
        public GlassdoorInfoDAL(string connectionString)
        {
            _dbManager = new DBManager(connectionString);
        }

        public void LogException(Log objLog)
        {
            try
            {
                _dbManager.Insert("call logexception('" + objLog.Module + "','" + objLog.Exception + "','" + objLog.CreatedBy + "','" + DateTime.Now + "')", CommandType.Text, null);
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
                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);               
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM updateglassdoorrating('" + companyName + "', '" + rating + "', '" + userId + "', '" + transactedDate + "')", CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    string jsonData = Convert.ToString(objDataSet.Tables[0].Rows[0]["json_data"]);
                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        objResp = JsonSerializer.Deserialize<Response>(jsonData);
                    }
                    else
                    {
                        objResp.StatusCode = 220;
                        objResp.StatusMessage = "Something went wrong";
                    }
                }
                else
                {
                    objResp.StatusCode = 220;
                    objResp.StatusMessage = "Something went wrong";
                }
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
                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM updateglassdoorurl('" + companyId + "', '" + glassdoorUrl + "', '" + userId + "', '" + transactedDate + "')", CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    string jsonData = Convert.ToString(objDataSet.Tables[0].Rows[0]["json_data"]);
                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        objResp = JsonSerializer.Deserialize<Response>(jsonData);
                    }
                    else
                    {
                        objResp.StatusCode = 220;
                        objResp.StatusMessage = "Something went wrong";
                    }
                }
                else
                {
                    objResp.StatusCode = 220;
                    objResp.StatusMessage = "Something went wrong";
                }
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
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM GetGlassdoorCompanyURL('" + companyId + "')", CommandType.Text);

                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in objDataSet.Tables[0].Rows)
                    {
                        objGlassdoorInfo.GlassdoorCompanyURL = Convert.ToString(item["glassdoor_url"]);
                        objGlassdoorInfo.CompanyId = Convert.ToInt32(item["company_id"]);
                        objGlassdoorInfo.CompanyName = Convert.ToString(item["company_name"]);
                        objGlassdoorInfo.StatusCode = "200";
                    }
                }
                else 
                {
                    objGlassdoorInfo.StatusCode = "220";
                }               
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
