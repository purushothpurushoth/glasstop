using GLASSTOP.Entity;
using GLASSTOP.DL;

namespace GLASSTOP.BAL
{
    public class JobsSchedulerBAL
    {
        public string ConnectionString = string.Empty;
        
        JobsSchedulerDAL jobsSchedulerDAL  = null;

        public JobsSchedulerBAL(string connectionString)
        {
            jobsSchedulerDAL = new JobsSchedulerDAL(connectionString);
        }

        public JobsScheduleResponse SaveJobsScheduler(JobsScheduler objJobsScheduler)
        {
            JobsScheduleResponse objScheduleResponse = new JobsScheduleResponse();
            try
            {
                objScheduleResponse = jobsSchedulerDAL.SaveJobsScheduler(objJobsScheduler);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objScheduleResponse;
        }

        public void LogException(Log objLog)
        {
            try
            {
                JobsSchedulerDAL objDAL = new JobsSchedulerDAL(ConnectionString);
                objDAL.LogException(objLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
