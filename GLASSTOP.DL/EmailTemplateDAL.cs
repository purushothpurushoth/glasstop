using System.Data;
using GLASSTOP.Utility;
using GLASSTOP.Entity;
using static GLASSTOP.Utility.Utils;
using System.Text.Json;

namespace GLASSTOP.DL
{
    public class EmailTemplateDAL : BaseDataAccess
    {
        public EmailTemplateDAL(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public List<DefaultEmailTemplate> GetDefaultEmailTemplate()
        {
            List<DefaultEmailTemplate> defaultEmailTemplate = new List<DefaultEmailTemplate>();

            var emailTemplates = base.ExecDataSet(Constant.QUERY_GET_MAILTEMPLATES, null, CommandType.Text);          

            if (emailTemplates != null)
                if (emailTemplates.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in emailTemplates.Tables[0].Rows)
                    {
                        defaultEmailTemplate.Add(new DefaultEmailTemplate()
                        {
                            TemplateId = Convert.ToInt32(item[Constant.PARAM_MAILTEMPLATEID]),
                            TemplateName = item[Constant.PARAM_MAILTEMPLATENAME].ToString(),
                            EmailMeta = item[Constant.PARAM_MAILMETA].ToString()

                        });
                    }

                }
            return defaultEmailTemplate;
        }

        public void LogException(Log objLog)
        {
            try
            {
                var dbManager = new DBManager(ConnectionString);
                dbManager.Insert("call logexception('" + objLog.Module + "','" + objLog.Exception + "','" + objLog.Exception + "','" + DateTime.Now + "')", CommandType.Text, null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public EmailResponse SaveEmailTemplates(EmailTemplate objReq)
        {
            EmailResponse objResp = new EmailResponse();
            DataTable dt_result = new DataTable();
          
            try
            {
                if (objReq != null && objReq.emailTemplates.Count > 0)
                {
                    var emailData = objReq.emailTemplates;
                    //DataTable dtEmailTemplates = ToDataTable(emailData);
                    var transactedDate = Convert.ToDateTime(objReq.TransactedDate);
                    var json = JsonSerializer.Serialize(emailData);
                    
                    var dbManager = new DBManager(ConnectionString);
                    var emaildataset = dbManager.GetDataSet("Select * from saveemailtemplate('" + json + "','" + objReq.CompanyId + "','" + objReq.CampaignName + "','" + objReq.TransactedBy + "','" + transactedDate + "')", CommandType.Text);
                    //var emaildataset = base.ExecDataSet(Constant.SP_SAVE_EMAILTEMPLATE, parameterList, commandType: CommandType.StoredProcedure);
               
                    if (emaildataset != null)
                        if (emaildataset.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow item in emaildataset.Tables[0].Rows)
                            {
                                objResp = new EmailResponse()
                                {
                                    CampaignId = Convert.ToInt32(item["Campaign_Id"]),
                                    CompanyId = Convert.ToInt32(item["Company_Id"]),
                                    ResponseStatus = "0"
                                };
                               
                            }

                        }

                }
               
            }
            catch (Exception ex)
            {
                objResp.ResponseStatus = "1";
            }

            return objResp;
        }
    }
}


