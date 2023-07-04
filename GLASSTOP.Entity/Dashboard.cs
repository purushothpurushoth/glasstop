using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLASSTOP.Entity
{
    public class Dashboard : Response
    {
        public List<CampaignReport> CampaignReport { get; set; }
    }

    public class CampaignReport 
    {
        public string CampaignName { get; set; }

        public string CampaignStatus { get; set; }

        public decimal BeforeCampaignRating { get; set; }

        public decimal AfterCampaignRating { get; set; }

        public decimal MailOpenRate { get; set; }

        public decimal MailClickRate { get; set; }

        public decimal FeedbackResponseRate { get; set; }

        public DateTime? CampaignStartDate { get; set; }

        public DateTime? CampaignEndDate { get; set; }
    }
}
