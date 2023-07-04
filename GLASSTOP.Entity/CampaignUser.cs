using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLASSTOP.Entity
{
    public class CampaignUser : Response
    {
        public int CompanyId { get; set; }

        public int CampaignId { get; set; }

        public string? CampaignName { get; set; }

        public int TransactedBy { get; set; }

        public List<CampaignUserList>? CampaignEndUser { get; set; }

        public string? DeleteCampaignUserIds { get; set; }

        public int StartRowIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public string? SearchText { get; set; }

        public bool? IsDeleteAll { get; set; }

        public int SearchTotalCount { get; set; } = 0;
    }

    public class CampaignUserList
    {
        public int CampaignUserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }

    public class CampaignUserResponse
    {
        public int StatusCode { get; set; }

        public string? StatusMessage { get; set; }

        public List<CampaignUserValidation> CampaignUserValidation { get; set; }
    }

    public class CampaignUserValidation
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailId { get; set; }

        public string ValidationMessage { get; set; }
    }

    public class CampaignUserDatatable
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailId { get; set; }
    }
}
