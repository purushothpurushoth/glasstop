using System;
using System.ComponentModel;
using System.Data;
using System.Net.Mail;
using System.Reflection;
using System.Text.RegularExpressions;

namespace GLASSTOP.Utility
{
    public static class Utils
    {
        public static bool IsValidEmail(string email)
        {
            try
            {
                // Regular expression for email validation
                string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
                Regex regex = new Regex(pattern);
                Match match = regex.Match(email);
                return match.Success;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsValidName(string name)
        {
            try
            {
                string pattern = @"^[a-zA-Z\s]+$";
                Regex regex = new Regex(pattern);
                Match match = regex.Match(name);
                return match.Success;
            }
            catch
            {
                return false;
            }
        }

        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }
    }

    public enum ValidationMessage
    {
        [DescriptionAttribute("First name is empty")]
        FirstNameEmpty,

        [DescriptionAttribute("First name is invalid")]
        FirstNameInvalid,

        [DescriptionAttribute("Last name is invalid")]
        LastNameInvalid,

        [DescriptionAttribute("Email is empty")]
        EmailEmpty,

        [DescriptionAttribute("Email is invalid")]
        EmailInvalid
    }

    public static class EnumExtensionMethods
    {
        public static string GetEnumDescription(this Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
    }
}
