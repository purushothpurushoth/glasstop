using GLASSTOP.BAL;
using GLASSTOP.Entity;
using GLASSTOP.Services.Helpers;
using GLASSTOP.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GLASSTOP.Services.Controllers
{
    [Route("glasstop-api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private IConfiguration _configuration;
        private readonly AppSettings _appSettings;
        UserBL objBL = null;
        private string _timeZone = string.Empty;
        private int _defaultUserId;

        public UserController(IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _appSettings = appSettings.Value;
            objBL = new UserBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
        }

        [HttpGet]
        [Route("GetRoles")]
        public List<Role> GetRoles()
        {
            List<Role> roleInfo = null;
            try
            {
                roleInfo = objBL.GetRoles();
            }
            catch (Exception ex)
            {
                objBL.LogException(new Log() { Module = "Get Roles", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return roleInfo;
        }

        [HttpPost]
        [Route("SaveUserDetails")]
        [RequestSizeLimit(int.MaxValue)]
        public IActionResult SaveUserDetails(User objUserDetails)
        {
            _timeZone = _appSettings.TimeZone != null ? _appSettings.TimeZone : "India Standard Time";
            _defaultUserId = _appSettings.DefaultUserId != 0 ? _appSettings.DefaultUserId : 1; 
            User objResp = new User(); 
            try
             {
                if (objUserDetails != null)
                {
                    objResp = objBL.SaveUserDetails(objUserDetails, _timeZone, _defaultUserId);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
             catch (Exception ex)
             {
                 objBL.LogException(new Log() { Module = "Save User Deatils", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
             }
            return Ok(objResp);
        }

        [HttpGet]
        [Route("GetUserDetails")]
        public IActionResult GetUserDetails(string email)
        {
            User objResp = new User();
            try
            {
                if(!string.IsNullOrEmpty(email))
                {
                    objResp = objBL.GetUserDetails(email);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objBL.LogException(new Log() { Module = "Get User Details", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }

        [HttpGet]
        [Route("GetPageDetails")]
        public IActionResult GetPageDetails()
        {
            NavigationMaster objResp = new NavigationMaster();
            try
            {
                objResp = objBL.GetPageDetails();
            }
            catch (Exception ex)
            {
                objBL.LogException(new Log() { Module = "Get Page Details", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }

        [HttpPost]
        [Route("SaveUserLastNavigation")]
        public IActionResult SaveUserLastNavigation(PageDetails objReq)
        {
            _timeZone = _appSettings.TimeZone != null ? _appSettings.TimeZone : "India Standard Time";
            Response objResp = new Response();
            try
            {
                if (objReq != null)
                {
                    objResp = objBL.UpdateUserLastNavigation(objReq, _timeZone);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objBL.LogException(new Log() { Module = "Save User Last Navigation", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }
    }    
}

