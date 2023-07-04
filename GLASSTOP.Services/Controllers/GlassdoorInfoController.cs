using GLASSTOP.Entity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;
using GLASSTOP.Utility;
using System.Text.Json.Nodes;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using GLASSTOP.BAL;
using GLASSTOP.Services.Helpers;
using Microsoft.Extensions.Options;


namespace GLASSTOP.Services.Controllers
{

    [Route("glasstop-api/[controller]")]
    [ApiController]
    public class GlassdoorInfoController
    {
        private IConfiguration _configuration;
        GlassdoorInfoBL objGlassdoorInfoBL = null;
        private readonly AppSettings _appSettings;
        private string _timeZone = string.Empty;

        public GlassdoorInfoController(IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _appSettings = appSettings.Value;
            objGlassdoorInfoBL = new GlassdoorInfoBL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
            _timeZone = _appSettings.TimeZone != null ? _appSettings.TimeZone : "India Standard Time";
        }

        [HttpGet]
        [Route("GetGlassdoorRating")]
        public GlassdoorInfo GetOverallRating(string companyName, int userId = 0)
        {
            GlassdoorInfo glassdoorInfo = new GlassdoorInfo();
            glassdoorInfo.CompanyName = companyName;
            string partnerId = Constant.PARAM_GLASSDOORAPI_PARTNERID;
            string partnerKey = Constant.PARAM_GLASSDOORAPI_PARTNERKEY;
            string responseFormat = Constant.PARAM_GLASSDOORAPI_RESPONSEFORMAT;
            string glassdoorApiVersion = Constant.PARAM_GLASSDOORAPI_VERSION;
            WebClient webClient = new WebClient();
            string url = "https://api.glassdoor.com/api/api.htm?v=" + glassdoorApiVersion + "&format="
            + responseFormat + "&t.p=" + partnerId + "&t.k=" + partnerKey + "&action=employers&q=" + companyName;
            string json = webClient.DownloadString(url);
            dynamic data = JObject.Parse(json);
            var employerDetails = data.response.employers.First;
            glassdoorInfo.OverallRating = employerDetails.overallRating;

            if (!string.IsNullOrEmpty(glassdoorInfo.OverallRating))
            {
                objGlassdoorInfoBL.UpdateGlassdoorRating(companyName, Convert.ToDecimal(glassdoorInfo.OverallRating), userId, _timeZone);
            }

            return glassdoorInfo;
        }

        [HttpGet]
        [Route("GetGlassdoorDetails")]
        public JsonObject GetClaimedStatusAndGlassdoorPageByURL(int companyId,string url,  int userId = 0)
        {
            string responseStatus = string.Empty;
            string companyStatus = string.Empty;
            bool isCompanyClaimedOnGlassdoor = false;
            var glassdoorImage = string.Empty;
            JsonObject obj = new JsonObject();
            WebDriver driver = new ChromeDriver();
            try
            {
                driver.Navigate().GoToUrl(url);
                driver.Manage().Window.Maximize();
                companyStatus = driver.FindElement(By.ClassName("employerStatus")).Text;
                glassdoorImage = driver.GetScreenshot().AsBase64EncodedString;

                if (companyStatus == "Engaged Employer")
                {
                    responseStatus = "0";
                    isCompanyClaimedOnGlassdoor = true;
                    obj.Add("responseStatus", responseStatus);
                    obj.Add("claimedStatus", isCompanyClaimedOnGlassdoor);
                }
                else if (companyStatus == "Is this your company?")
                {
                    responseStatus = "0"; ;
                    isCompanyClaimedOnGlassdoor = false;
                    obj.Add("responseStatus", responseStatus);
                    obj.Add("claimedStatus", isCompanyClaimedOnGlassdoor);
                }
                if (glassdoorImage != null)
                {
                    obj.Add("glassdoorPage", glassdoorImage);
                }

                if (!string.IsNullOrEmpty(url))
                {
                    objGlassdoorInfoBL.UpdateGlassdoorUrl(companyId, url, userId, _timeZone);
                }

                return obj;
            }
            catch (NoSuchElementException ex)
            {
                responseStatus = "1";
                obj.Add("responseStatus", responseStatus);
                obj.Add("message", "No result found , please check your company url");
                return obj;

            }
            catch (Exception ex)
            {
                responseStatus = "1";
                obj.Add("responseStatus", responseStatus);
                obj.Add("message", "No result found , please check your company url");
                return obj;

            }
            finally
            {
                driver.Quit();
            }

        }


        [HttpGet]
        [Route("GetGlassdoorUrl")]       
        public GlassdoorInfo GetGlassdoorUrl(int companyId)
        {
            GlassdoorInfo objResp = new GlassdoorInfo();
         
            try
            {
               
                if (companyId != null && companyId != 0)
                {
                        
                    objResp = objGlassdoorInfoBL.GetGlassdoorUrl(companyId);
                } 
                else
                {
                    objResp.StatusCode = "220";
                    
                }
            }
            catch (Exception ex)
            {
                objGlassdoorInfoBL.LogException(new Log() { Module = "Get Glass door URL", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return objResp;
        }
       
    }
}
