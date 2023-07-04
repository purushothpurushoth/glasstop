using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLASSTOP.Entity
{
    public class JobsScheduler
    {
        public int CompanyId { get; set; }
        public int CampaignIdId { get; set; }
        public string ScheduleDay { get; set; }      
        public int MailTriggerCountPerDay { get; set; }
        public string TimeZone { get; set; }
        public string StartTime { get; set; }
        public string TransactedDate { get; set; }
        public int TransactedBy { get; set; }
    }
    public class JobsScheduleResponse
    {
        public int StatusCode { get; set; }

        public string? StatusMessage { get; set; }      

    }

}
