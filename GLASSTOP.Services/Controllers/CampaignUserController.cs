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
    public class CampaignUserController : ControllerBase
    {
        private IConfiguration _configuration;
        CampaignUserBL objCampaignUserBL = null;
        private readonly AppSettings _appSettings;
        private string _timeZone = string.Empty;

        public CampaignUserController(IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _appSettings = appSettings.Value;
            objCampaignUserBL = new CampaignUserBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
            _timeZone = _appSettings.TimeZone != null ? _appSettings.TimeZone : "India Standard Time";
        }

        [HttpPost]
        [Route("SaveCampaignUser")]
        [RequestSizeLimit(int.MaxValue)]
        public IActionResult SaveCampaignUser(CampaignUser objReq)
        {
            CampaignUserResponse objResp = new CampaignUserResponse();
            try
            {
                if (objReq != null && objReq.CampaignEndUser.Count > 0)
                {
                    objResp = objCampaignUserBL.SaveCampaignUser(objReq, _timeZone);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
                objCampaignUserBL.LogException(new Log() { Module = "Save Campaign User", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }

        [HttpPost]
        [Route("GetCampaignUser")]
        public IActionResult GetCampaignUser(CampaignUser objReq)
        {
            CampaignUser objResp = new CampaignUser();
            try
            {
                if (objReq != null && objReq.PageSize != 0)
                {
                    objResp = objCampaignUserBL.GetCampaignUser(objReq);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                    
                }
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
                objCampaignUserBL.LogException(new Log() { Module = "Get Campaign User", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }

        [HttpPost]
        [Route("DeleteCampaignUser")]
        public IActionResult DeleteCampaignUser(CampaignUser objReq)
        {
            Response objResp = new Response();
            try
            {
                if (objReq != null)
                {
                    objResp = objCampaignUserBL.DeleteCampaignUser(objReq, _timeZone);
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
                objCampaignUserBL.LogException(new Log() { Module = "Delete Campaign User", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objResp);
        }
    }
}
