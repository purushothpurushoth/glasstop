using System.Data;
using GLASSTOP.Utility;
using GLASSTOP.Entity;
using System.Text.Json;
using Npgsql;

namespace GLASSTOP.DL
{
    public class UserDAL
    {
        private DBManager _dbManager = null;
        public UserDAL(string connectionString)
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

        public List<Role> GetRoles()
        {
            try
            {
                List<Role> objRoleDetails = new List<Role>();
                var objDataSet = _dbManager.GetDataSet(Constant.QUERY_GET_ROLE, CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in objDataSet.Tables[0].Rows)
                    {
                        objRoleDetails.Add(new Role()
                        {
                            RoleId = Convert.ToInt32(item[Constant.COLUMN_ROLEID]),
                            RoleName = Convert.ToString(item[Constant.COLUMN_ROLE_NAME]),
                            Description = Convert.ToString(item[Constant.COLUMN_DESCRIPTION]),
                            IsActive = Convert.ToBoolean(item[Constant.COLUMN_ISACTIVE])
                        });
                    }
                }
                return objRoleDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SaveUserDetails(User objUser, string timeZone, int userId)
        {
            User objResp = new User();
            try
            {
                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM transactuser('" + objUser.FirstName + "', '" + objUser.LastName + "', '" + objUser.Mail + "', '" + objUser.CompanyName + "' , '" + objUser.RoleId + "' , '" + objUser.ProfilePhoto + "' , '" + userId + "', '" + transactedDate + "')", CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    string jsonData = Convert.ToString(objDataSet.Tables[0].Rows[0]["json_data"]);
                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        objResp = JsonSerializer.Deserialize<User>(jsonData);
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

        public User GetUserDetails(string email)
        {
            User objUserDetails = new User();
            try
            {
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM getuserdetails('" + email + "')", CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    string jsonData = Convert.ToString(objDataSet.Tables[0].Rows[0]["json_data"]);
                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        objUserDetails = JsonSerializer.Deserialize<User>(jsonData);
                    }
                    else
                    {
                        objUserDetails.StatusCode = 1;
                        objUserDetails.StatusMessage = "User does not exist";
                    }
                }
                else
                {
                    objUserDetails.StatusCode = 220;
                    objUserDetails.StatusMessage = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                objUserDetails.StatusCode = 404;
                objUserDetails.StatusMessage = ex.Message.ToString();
            }
            return objUserDetails;
        }

        public NavigationMaster GetPageDetails()
        {
            NavigationMaster objresp = new NavigationMaster();
            try
            {
                objresp.PageDetails = new List<PageDetails>();
                var objDataSet = _dbManager.GetDataSet(Constant.QUERY_GET_PAGE_DETAILS, CommandType.Text);
                if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0].Rows.Count > 0)
                {
                    objresp.StatusCode = 200;
                    objresp.StatusMessage = "Success";
                    foreach (DataRow item in objDataSet.Tables[0].Rows)
                    {
                        objresp.PageDetails.Add(new PageDetails()
                        {
                            PageId = Convert.ToInt32(item[Constant.COLUMN_PAGEID]),
                            PageName = Convert.ToString(item[Constant.COLUMN_PAGENAME]),
                            IsActive = Convert.ToBoolean(item[Constant.COLUMN_ISACTIVE])
                        });
                    }
                }
                else
                {
                    objresp.StatusCode = 220;
                    objresp.StatusMessage = "Page Navigation master data not found";
                }
            }
            catch (Exception ex)
            {
                objresp.StatusCode = 404;
                objresp.StatusMessage = ex.Message.ToString();
            }
            return objresp;
        }

        public Response UpdateUserLastNavigation(PageDetails objReq, string timeZone)
        {
            Response objResp = new Response();
            try
            {
                var transactedDate = BasicHelper.GetDateTimeNow(timeZone);
                var objDataSet = _dbManager.GetDataSet("SELECT * FROM updateusernavigation('" + objReq.PageId + "', '" + objReq.UserId + "', '" + transactedDate + "')", CommandType.Text);
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
    }
}


