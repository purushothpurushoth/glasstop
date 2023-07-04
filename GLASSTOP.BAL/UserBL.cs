using System;
using System.Collections.Generic;
using GLASSTOP.Entity;
using GLASSTOP.DL;

namespace GLASSTOP.BAL
{
    public class UserBL
    {
        UserDAL objDAL = null;

        public UserBL(string connectionString)
        {
            objDAL = new UserDAL(connectionString);
        }

        public void LogException(Log objLog)
        {
            try
            {
                objDAL.LogException(objLog);
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
                return objDAL.GetRoles();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SaveUserDetails(User objUserDetails, string timeZone, int userId)
        {
            User objResp = new User();
            try
            {
                objResp = objDAL.SaveUserDetails(objUserDetails, timeZone, userId);
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
            User objResp = new User();
            try
            {
                objResp = objDAL.GetUserDetails(email);
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }

        public NavigationMaster GetPageDetails()
        {
            NavigationMaster objResp = new NavigationMaster();
            try
            {
                objResp = objDAL.GetPageDetails();
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return objResp;
        }

        public Response UpdateUserLastNavigation(PageDetails objReq, string timeZone)
        {
            Response objResp = new Response();
            try
            {
                objResp = objDAL.UpdateUserLastNavigation(objReq, timeZone);
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