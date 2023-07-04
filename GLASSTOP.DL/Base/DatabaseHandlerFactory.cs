using System.Configuration;

namespace GLASSTOP.DL
{
    public class DatabaseHandlerFactory
    {
        private ConnectionStringSettings connectionStringSettings;

        public DatabaseHandlerFactory(string connectionStringName)
        {
            //connectionStringSettings = new ConnectionStringSettings("DBConnection", "");
            //connectionStringSettings.ProviderName = "system.data.sqlclient";
            connectionStringSettings = new ConnectionStringSettings("DBConnection", connectionStringName);
            connectionStringSettings.ProviderName = "Npgsql";
        }

        public IDatabaseHandler CreateDatabase()
        {
            IDatabaseHandler database = null;
         
            switch (connectionStringSettings.ProviderName.ToLower())
            {
                case "system.data.sqlclient":
                    database = new SqlDataAccess(connectionStringSettings.ConnectionString);
                    break;
                case "npgsql":
                    database = new PostgreSqlDataAccess(connectionStringSettings.ConnectionString);
                    break;
            }
           
            return database;
        }

        public string GetProviderName()
        {
            return connectionStringSettings.ProviderName;
        }
    }
}
