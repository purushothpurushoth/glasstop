using GLASSTOP.BAL;
using GLASSTOP.Entity;
using GLASSTOP.Utility;
using Microsoft.AspNetCore.Mvc;

namespace GLASSTOP.Services.Controllers
{
    [Route("glasstop-api/[controller]")]
    [ApiController]
    public class JobsSchedulerController : ControllerBase  
    {
        private IConfiguration _configuration;
        JobsSchedulerBAL objSchedulerBAL = null;
        public JobsSchedulerController(IConfiguration configuration)
        {
            _configuration = configuration;
            objSchedulerBAL = new JobsSchedulerBAL(_configuration["ConnectionStrings:GLASSTOPConnection"]);
        }

        [HttpPost]
        [Route("SaveJobsScheduler")]
        [RequestSizeLimit(int.MaxValue)]
        public IActionResult SaveJobsScheduler(JobsScheduler objJobsScheduler)
        {
            JobsScheduleResponse objScheduleResponse = new JobsScheduleResponse();
            try
            {
                if (objJobsScheduler != null)
                {
                    objScheduleResponse = objSchedulerBAL.SaveJobsScheduler(objJobsScheduler);
                }
                else
                {
                    objScheduleResponse.StatusCode = 25;
                    objScheduleResponse.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objScheduleResponse.StatusCode = 404;
                objScheduleResponse.StatusMessage = ex.Message.ToString();
                objSchedulerBAL.LogException(new Log() { Module = "Save Jobs Scheduler", Exception = ex.Message, CreatedBy = Constant.SYSTEM_USER });
            }
            return Ok(objScheduleResponse);
        }


    }
}
