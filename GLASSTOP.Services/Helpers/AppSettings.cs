namespace GLASSTOP.Services.Helpers
{
    public class AppSettings
    {
        public string? SecretKey { get; set; }

        public string? TimeZone { get; set; }

        public int DefaultUserId { get; set; }

        public int JwtTokenExpire { get; set;}
    }
}
