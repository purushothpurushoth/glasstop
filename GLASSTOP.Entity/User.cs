using System.Collections.Generic;
namespace GLASSTOP.Entity
{
    public class User : Response
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Mail { get; set; }
        public int RoleId { get; set; }
        public string? ProfilePhoto { get; set; }
        public bool? IsActive { get; set; }
        public int CompanyId { get; set; } = 0;
        public int UserId { get; set; } = 0;
        public int UserNavigationPageId { get; set; } = 0;
        public string? PageName { get; set; }
    }
}

