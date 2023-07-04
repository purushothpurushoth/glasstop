namespace GLASSTOP.Entity
{
    public class NavigationMaster : Response
    {
        public List<PageDetails>? PageDetails { get; set; }
    }

    public class PageDetails 
    {
        public int PageId { get; set; }

        public string? PageName { get; set; }

        public Boolean IsActive { get; set; }

        public int UserId { get; set; } = 0;
    }
}
