namespace GLASSTOP.Entity
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool IsActive { get; set; }
        public int TransactedBy { get; set; }
        public string TransactedDate { get; set; }
        public string TimeZone { get; set; }
        public string Description { get; set; }
    }
}
