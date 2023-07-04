using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GLASSTOP.Entity
{
    public class EmailTemplate
    {
        [JsonPropertyName("campaignName")]
        [Required]
        public string CampaignName { get; set; }
        public int CompanyId { get; set; }

        [JsonPropertyName("emailTemplates")]
        public List<Email> emailTemplates { get; set; } = new List<Email>();
        [JsonPropertyName("companyName")]
        public string CompanyName { get; set; }
        [JsonPropertyName("transactedBy")]
        public int TransactedBy { get; set; }
        [JsonPropertyName("transactedDate")]
        public string TransactedDate { get; set; }
    }
    public class EmailTemplateResponse
    {
        public int StatusCode { get; set; }

        public string? StatusMessage { get; set; }

    }


}

