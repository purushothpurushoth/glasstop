using System.Globalization;
using TimeZoneConverter;

namespace GLASSTOP.Utility
{
    public static class BasicHelper
    {
        public static DateTime GetDateTimeNow(string timeZone, string inputDate = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(inputDate))
                {
                    inputDate = DateTime.UtcNow.ToString("d/M/yyyy HH:mm:ss");
                }
                var date = DateTime.ParseExact(inputDate, @"d/M/yyyy HH:mm:ss", null);
                TimeZoneInfo info = TZConvert.GetTimeZoneInfo(timeZone);
                return TimeZoneInfo.ConvertTimeToUtc(date, info);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static DateTime GetLocalDateTime(string timeZone, string inputDate = null)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(inputDate))
                {
                    inputDate = DateTime.UtcNow.ToString("d/M/yyyy HH:mm:ss");
                }
                var date = DateTime.ParseExact(inputDate, @"d/M/yyyy HH:mm:ss", null);
                TimeZoneInfo info = TZConvert.GetTimeZoneInfo(timeZone);
                return TimeZoneInfo.ConvertTimeFromUtc(date, info);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string FormatDate(string inputDate)
        {
            DateTime dDate;
            string newDateFormat = String.Empty;
            if (DateTime.TryParseExact(inputDate, "dd/MM/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:MM/dd/yyyy}", dDate);
            }
            else if (DateTime.TryParseExact(inputDate, "dd/M/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:MM/dd/yyyy}", dDate);
            }
            return newDateFormat;
        }
        public static string GetDate(string inputDate)
        {
            DateTime dDate;
            string newDateFormat = String.Empty;
            inputDate = inputDate.Replace("-", "/");
            if (DateTime.TryParseExact(inputDate, "d/M/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:d/M/yyyy}", dDate);
            }
            else if (DateTime.TryParseExact(inputDate, "dd/M/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:d/M/yyyy}", dDate);
            }
            else if (DateTime.TryParseExact(inputDate, "d/MM/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:d/M/yyyy}", dDate);
            }
            else if (DateTime.TryParseExact(inputDate, "dd/MM/yyyy", null, DateTimeStyles.None, out dDate))
            {
                newDateFormat = string.Format("{0:d/M/yyyy}", dDate);
            }
            else
            {
                newDateFormat = inputDate;
            }
            return newDateFormat;
        }
    }

}
