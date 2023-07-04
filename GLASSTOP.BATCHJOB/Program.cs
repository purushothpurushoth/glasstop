using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace GLASSTOP.BATCHJOB
{
    public class Program 
    {
        //var dbManager = new DBManager(ConnectionString);
        static void Main(string[] args)
        {
            
            //DB call
            //Convert JSON

            string Jsondata = string.Empty;
            string result = PostMethod(Jsondata, "E");
            if (result == "")
            {
                //DB call
            }
        }

        public static string PostMethod(string postdata, string MethodName)
        {
            try
            {
                string APIURL = ConfigurationManager.AppSettings["APIURL"];
                string result = String.Empty;
                string ServiceMethod = APIURL + "MethodName";
                var ServiceWebRequest = WebRequest.CreateHttp(ServiceMethod);

                ServiceWebRequest.ContentType = "application/json; charset=utf-8";
                ServiceWebRequest.Method = "POST";
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                using (var streamWriter = new StreamWriter(ServiceWebRequest.GetRequestStream()))
                {
                    string json = postdata;
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }
                ServiceWebRequest.Proxy = null;

                var httpResponse = (HttpWebResponse)ServiceWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = JsonConvert.DeserializeObject<string>(streamReader.ReadToEnd());
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string GetMethod(string postdata, string MethodName)
        {
            try
            {
                string APIURL = ConfigurationManager.AppSettings["APIURL"];
                string result = String.Empty;
                string ServiceMethod = APIURL + "MethodName";
                var ServiceWebRequest = WebRequest.CreateHttp(ServiceMethod);

                ServiceWebRequest.ContentType = "application/json; charset=utf-8";
                ServiceWebRequest.Method = "GET";
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                using (var streamWriter = new StreamWriter(ServiceWebRequest.GetRequestStream()))
                {
                    string json = postdata;
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }
                ServiceWebRequest.Proxy = null;

                var httpResponse = (HttpWebResponse)ServiceWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = JsonConvert.DeserializeObject<string>(streamReader.ReadToEnd());
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
