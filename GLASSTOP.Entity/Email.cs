using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GLASSTOP.Entity
{
    public class Email
    {
        [JsonPropertyName("mailtemplateid")]
        public int MailTemplateId { get; set; }
        [JsonPropertyName("mailsubject")]
        [Required]
        public string MaiSubject { get; set; }
        [JsonPropertyName("mailbody")]
        [Required]
        public string MailBody { get; set; }

        [JsonPropertyName("senderemailid")]
        [Required]
        public string SenderEmailId { get; set; }

    }
}

