using System.Data;
using GLASSTOP.Utility;
using GLASSTOP.Entity;
using static GLASSTOP.Utility.Utils;
using System.Text.Json;

namespace GLASSTOP.DL
{
    public class CampaignUserDAL
    {
        private DBManager _dbManager = null;
        public CampaignUserDAL(string connectionString)
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

        public CampaignUserResponse SaveCampaignUser(CampaignUser objReq, string timeZone)
        {
            CampaignUserResponse objResp = new CampaignUserResponse();
            objResp.CampaignUserValidation = new List<CampaignUserValidation>();
            try
            {
                if (objReq != null && objReq.CampaignEndUser.Count > 0)
                {
                    var duplicate_emailid = objReq.CampaignEndUser.GroupBy(x => x.Email.ToLower())
                                      .Where(g => g.Count() > 1)
                                      .Select(y => y.Key)
                                      .ToList();

                    if (duplicate_emailid.Count > 0)
                    {
                        objResp.StatusCode = 230;
                        objResp.StatusMessage = "Duplicate records found - " + String.Join(", ", duplicate_emailid);
                    }
                    else
                    {
                        var result = CampaignUserValidation(objReq.CampaignEndUser);
                        if (result.Item1 != null && result.Item1.Count > 0)
                        {
                            objResp.StatusCode = 201;
                            objResp.StatusMessage = "Some validation error occurs";
                            objResp.CampaignUserValidation = result.Item1;
                        }
                        else
                        {
                            if (result.Item2 != null && result.Item2.Count > 0)
                            {
                                string input_json_data = JsonSerializer.Serialize(result.Item2);
                                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);
                                var objDataSet = _dbManager.GetDataSet("SELECT * FROM savecampaignuser('" + input_json_data + "', '" + objReq.CampaignId + "', '" + objReq.CompanyId + "', '" + objReq.TransactedBy + "' , '" + transactedDate + "' , '" + true + "' )", CommandType.Text);
                                string jsonData = Convert.ToString(objDataSet.Tables[0].Rows[0]["json_data"]);
                                if (!string.IsNullOrEmpty(jsonData))
                                {
                                    objResp = JsonSerializer.Deserialize<CampaignUserResponse>(jsonData);
                                }
                                else
                                {
                                    objResp.StatusCode = 205;
                                    objResp.StatusMessage = "Something went wrong, Please try later";
                                }
                            }
                            else
                            {
                                objResp.StatusCode = 204;
                                objResp.StatusMessage = "Error while processing records";
                            }
                        }
                    }
                }
                else
                {
                    objResp.StatusCode = 225;
                    objResp.StatusMessage = "Input field is required";
                }
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
            objResp.CampaignEndUser = new List<CampaignUserList>();
            CampaignUserList objUser = null;
            int rowindex = 0;
            try
            {
                if (objReq.StartRowIndex != 0)
                {
                    rowindex = objReq.StartRowIndex * objReq.PageSize;
                }
                else
                {
                    rowindex = objReq.StartRowIndex;
                }
                string searchText = string.IsNullOrEmpty(objReq.SearchText) ? string.Empty : objReq.SearchText;
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM getcampaignuser('" + rowindex + "', '" + objReq.PageSize + "', '" + objReq.CampaignId + "', '" + objReq.CompanyId + "' , '" + searchText + "'  )", CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    if (Convert.ToInt32(objDataSet.Tables[0].Rows[0][Constant.COLUMN_STATUSCODE]) == 200)
                    {
                        objResp.StatusCode = 200;
                        objResp.StatusMessage = "Success";
                        objResp.TotalCount = Convert.ToInt32(objDataSet.Tables[0].Rows[0][Constant.COLUMN_TOTALCOUNT]);
                        if (string.IsNullOrEmpty(objReq.SearchText))
                        {
                            objResp.SearchTotalCount = objResp.TotalCount;
                        }
                        else
                        {
                            objResp.SearchTotalCount = Convert.ToInt32(objDataSet.Tables[0].Rows[0][Constant.COLUMN_SEARCHTOTALCOUNT]);
                        }
                        foreach (DataTable table in objDataSet.Tables)
                        {
                            foreach (DataRow dr in table.Rows)
                            {
                                if (!string.IsNullOrEmpty(Convert.ToString(dr["EmailId"])))
                                {
                                    objUser = new CampaignUserList();
                                    objUser.CampaignUserId = Convert.ToInt32(dr["CampaignUserId"]);
                                    objUser.FirstName = Convert.ToString(dr[Constant.COLUMN_FIRSTNAME]);
                                    objUser.LastName = Convert.ToString(dr[Constant.COLUMN_LASTNAME]);
                                    objUser.Email = Convert.ToString(dr["EmailId"]);
                                    objResp.CampaignEndUser.Add(objUser);
                                }
                            }
                        }
                    }
                    else
                    {
                        objResp.StatusCode = 220;
                        objResp.StatusMessage = "Something went wrong";
                    }
                }
                else
                {
                    objResp.StatusCode = 250;
                    objResp.StatusMessage = "No records found in campaign user table";
                }
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
                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);
                string _deleteIds = string.IsNullOrEmpty(objReq.DeleteCampaignUserIds) ? string.Empty : objReq.DeleteCampaignUserIds;
                string searchText = string.IsNullOrEmpty(objReq.SearchText) ? string.Empty : objReq.SearchText;
                bool isDeleteAll = (bool)(objReq.IsDeleteAll == null ? false : objReq.IsDeleteAll);
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM deletecampaignuser('" + _deleteIds + "', '" + objReq.CampaignId + "', '" + objReq.CompanyId + "', '" + objReq.TransactedBy + "', '" + transactedDate + "', '" + isDeleteAll + "' , '" + searchText + "'  )", CommandType.Text);
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

        private Tuple<List<CampaignUserValidation>, List<CampaignUserDatatable>> CampaignUserValidation(List<CampaignUserList> campaignEndUser)
        {
            List<CampaignUserValidation> objListUser = new List<CampaignUserValidation>();
            CampaignUserValidation objValidation = null;
            List<CampaignUserDatatable> objListDtCampaign = new List<CampaignUserDatatable>();
            CampaignUserDatatable objDtCampaign = null;
            bool isValidFirstName = true;
            bool isValidLastName = true;
            bool isValidEmail = true;
            string errMessage = string.Empty;
            try
            {
                foreach (var item in campaignEndUser)
                {
                    isValidFirstName = true;
                    isValidLastName = true;
                    isValidEmail = true;
                    errMessage = string.Empty;
                    if (!string.IsNullOrEmpty(item.FirstName))
                    {
                        if (!IsValidName(item.FirstName))
                        {
                            isValidFirstName = false;
                            errMessage = ValidationMessage.FirstNameInvalid.GetEnumDescription();
                        }
                    }
                    else
                    {
                        errMessage = ValidationMessage.FirstNameEmpty.GetEnumDescription();
                        isValidFirstName = false;
                    }

                    if (!string.IsNullOrEmpty(item.LastName))
                    {
                        if (!IsValidName(item.LastName))
                        {
                            isValidEmail = false;
                            if (!string.IsNullOrEmpty(errMessage))
                            {
                                errMessage += "," + ValidationMessage.LastNameInvalid.GetEnumDescription();
                            }
                            else
                            {
                                errMessage = ValidationMessage.LastNameInvalid.GetEnumDescription();
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(item.Email))
                    {
                        if (!IsValidEmail(item.Email))
                        {
                            isValidEmail = false;
                            if (!string.IsNullOrEmpty(errMessage))
                            {
                                errMessage += "," + ValidationMessage.EmailInvalid.GetEnumDescription();
                            }
                            else
                            {
                                errMessage = ValidationMessage.EmailInvalid.GetEnumDescription();
                            }
                        }
                    }
                    else
                    {
                        isValidFirstName = false;
                        if (!string.IsNullOrEmpty(errMessage))
                        {
                            errMessage += "," + ValidationMessage.EmailEmpty.GetEnumDescription();
                        }
                        else
                        {
                            errMessage = ValidationMessage.EmailEmpty.GetEnumDescription();
                        }
                    }

                    if (isValidEmail == false || isValidFirstName == false || isValidLastName == false)
                    {
                        objValidation = new CampaignUserValidation();
                        objValidation.FirstName = item.FirstName;
                        objValidation.LastName = item.LastName;
                        objValidation.EmailId = item.Email;
                        objValidation.ValidationMessage = errMessage;
                        objListUser.Add(objValidation);
                    }

                    if (isValidEmail == true && isValidFirstName == true && isValidLastName == true)
                    {
                        objDtCampaign = new CampaignUserDatatable();
                        objDtCampaign.FirstName = item.FirstName;
                        objDtCampaign.LastName = item.LastName;
                        objDtCampaign.EmailId = item.Email;
                        objListDtCampaign.Add(objDtCampaign);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return new Tuple<List<CampaignUserValidation>, List<CampaignUserDatatable>>(objListUser, objListDtCampaign);
        }
    }
}
