using System;
using System.Collections.Generic;
using GLASSTOP.Entity;
using GLASSTOP.DL;

namespace GLASSTOP.BAL
{
    public class EmailTemplateBL
    {
        public string ConnectionString = string.Empty;
        public EmailTemplateBL(string connectionString)
        {
            ConnectionString = connectionString;
        }
        public void LogException(Log objLog)
        {
            try
            {
                EmailTemplateDAL objDAL = new EmailTemplateDAL(ConnectionString);
                objDAL.LogException(objLog);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public EmailResponse SaveEmailTemplate(EmailTemplate objEmailTemplates)
        {
            EmailResponse emailResponse = new EmailResponse();
            try
            {
                EmailTemplateDAL objEmailTemplateDAL = new EmailTemplateDAL(ConnectionString);
                emailResponse = objEmailTemplateDAL.SaveEmailTemplates(objEmailTemplates);
            }
            catch (Exception ex)
            {
                emailResponse.ResponseStatus = "1";
            }
            return emailResponse;
        }
        public List<DefaultEmailTemplate> GetDefaultEmailTemplate()
        {
            List<DefaultEmailTemplate> objDefaultEmailTemplates = new List<DefaultEmailTemplate>();
            try
            {

                EmailTemplateDAL objemailTemplateDAL = new EmailTemplateDAL(ConnectionString);
                objDefaultEmailTemplates = objemailTemplateDAL.GetDefaultEmailTemplate();
            }
            catch (Exception)
            {

                throw;
            }
            return objDefaultEmailTemplates;
        }

    }

}

