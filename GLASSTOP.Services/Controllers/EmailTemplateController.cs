using GLASSTOP.BAL;
using GLASSTOP.Entity;
using GLASSTOP.Services.Helpers;
using GLASSTOP.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

namespace GLASSTOP.Services.Controllers
{
    [Route("glasstop-api/[controller]")]
    [ApiController]
    public class EmailTemplateController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly AppSettings _appSettings;
        EmailTemplateBL objBL = null;
        public EmailTemplateController(IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _configuration = configuration;
            _appSettings = appSettings.Value;
            objBL = new EmailTemplateBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);

        }

            [HttpPost]
        [Route("SaveEmailTemplates")]
        public EmailResponse SaveEmailTemplates(EmailTemplate objEmailTemplate)
        {
            EmailResponse emailResponse = new EmailResponse();
           // EmailTemplateBL objBL = new EmailTemplateBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
            try
            {
                if (objEmailTemplate != null)
                {
                    emailResponse = objBL.SaveEmailTemplate(objEmailTemplate);
                }
                else
                {
                    emailResponse.ResponseStatus = "1";
                }
            }
            catch (Exception ex)
            {
                emailResponse.ResponseStatus = "1";
                objBL.LogException(new Log() { Module = "Save Email Template", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return emailResponse;
        }

        [HttpGet]
        [Route("GetDefaultEmailTemplate")]
        public List<DefaultEmailTemplate> GetDefaultEmailTemplate()
        {
            List<DefaultEmailTemplate> objDefaultEmailTemplates = new List<DefaultEmailTemplate>();
          //  EmailTemplateBL objBL = new EmailTemplateBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
            try
            {
                objDefaultEmailTemplates = objBL.GetDefaultEmailTemplate();
            }
            catch (Exception ex)
            {
                objBL.LogException(new Log() { Module = "Get Default Email Template", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return objDefaultEmailTemplates;
        }
    }
}

