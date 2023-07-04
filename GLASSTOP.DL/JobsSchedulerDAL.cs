using GLASSTOP.Entity;
using GLASSTOP.Utility;
using System.Data;

namespace GLASSTOP.DL
{
    public class JobsSchedulerDAL: BaseDataAccess
    {
        public JobsSchedulerDAL(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public JobsScheduleResponse SaveJobsScheduler(JobsScheduler objJobsScheduler)
        {
            JobsScheduleResponse objScheduleResponse = new JobsScheduleResponse();
            try
            {
                //var transactedDate = BasicHelper.GetDateTimeNow(objJobsScheduler.TimeZone);
                var parameterList = base.GetParameters(
                    Constant.PARAM_COMPANYID,objJobsScheduler.CompanyId,
                    Constant.PARAM_CAMPAIGNID,objJobsScheduler.CompanyId,
                    Constant.PARAM_SCHEDULEDAY,objJobsScheduler.ScheduleDay,
                    Constant.PARAM_TIMEZONE,objJobsScheduler.TimeZone,
                    Constant.PARAM_STRATTIME,objJobsScheduler.StartTime,             
                    Constant.PARAM_TRANSACT_BY, Convert.ToInt32(objJobsScheduler.TransactedBy),
                    Constant.PARAM_TRANSACTED_DATE, objJobsScheduler.TransactedDate
                    );
                //var objDataSet = null; ; //base.ExecDataSet(Constant.SP_SAVE_JOBSSHEDULER, parameterList, CommandType.StoredProcedure);
                //if (objDataSet != null && objDataSet.Tables.Count > 0 && objDataSet.Tables[0] != null)
                //{
                //    if (Convert.ToInt32(objDataSet.Tables[0].Rows[0][Constant.COLUMN_STATUSCODE]) == 200)
                //    {
                //        objScheduleResponse.StatusCode = 200;
                //        objScheduleResponse.StatusMessage = "Success";
                //    }
                //    else
                //    {
                //        objScheduleResponse.StatusCode = 1;
                //        objScheduleResponse.StatusMessage = "Job does not exist";
                //    }
                //}
                //else
                //{
                //    objScheduleResponse.StatusCode = 220;
                //    objScheduleResponse.StatusMessage = "Something went wrong";
                //}
            }
            catch (Exception ex)
            {
                objScheduleResponse.StatusCode = 404;
                objScheduleResponse.StatusMessage = ex.Message.ToString();
            }
            return objScheduleResponse;
        }
        public void LogException(Log objLog)
        {
            try
            {
                //var parameterList = base.GetParameters(
                //                        Constant.PARAM_MODULE, objLog.Module,
                //                        Constant.PARAM_EXCEPTION, objLog.Exception,
                //                        Constant.PARAM_TRANSACT_BY, objLog.CreatedBy,
                //                        Constant.PARAM_TRANSACTED_DATE, DateTime.Now);
                //base.ExecuteNonQuery(Constant.SP_LOG_EXCEPTION, parameterList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
