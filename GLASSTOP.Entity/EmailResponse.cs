using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GLASSTOP.Entity
{
    public class EmailResponse
    {
        public int CampaignId { get; set; }
        public int CompanyId { get; set; }
        public string ResponseStatus { get; set; }
    }
}

