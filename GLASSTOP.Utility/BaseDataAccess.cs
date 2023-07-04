using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using Npgsql;
using NpgsqlTypes;

namespace GLASSTOP.Utility
{
    public class BaseDataAccess :DbContext
    {
        protected string ConnectionString { get; set; }

        public BaseDataAccess()
        {
        }

        public BaseDataAccess(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private NpgsqlConnection GetConnection()
        {
            NpgsqlConnection connection = new NpgsqlConnection(this.ConnectionString);
            if (connection.State != ConnectionState.Open)
                connection.Open();
            return connection;
        }

        protected DbCommand GetCommand(DbConnection connection, string commandText, CommandType commandType)
        {
            NpgsqlCommand command = new NpgsqlCommand(commandText, connection as NpgsqlConnection);
            command.CommandType = commandType;
            return command;
        }

        protected NpgsqlParameter GetParameter(string parameter, object value)
        {
            NpgsqlParameter parameterObject = new NpgsqlParameter(parameter, value != null ? value : DBNull.Value);
            parameterObject.Direction = ParameterDirection.Input;
            return parameterObject;
        }

        protected List<DbParameter> GetParameters(params object[] args)
        {
            List<DbParameter> parameterList = new List<DbParameter>();
            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] is string && i < (args.Length - 1))
                {
                    parameterList.Add(GetParameter((string)args[i], args[++i]));
                }
                else throw new ArgumentException(Constant.ARGUMENT_EXCEPTION);
            }
            return parameterList;
        }

        protected NpgsqlParameter GetParameterOut(string parameter, SqlDbType type, object value = null, ParameterDirection parameterDirection = ParameterDirection.InputOutput)
        {
            NpgsqlParameter parameterObject = new NpgsqlParameter(parameter, type); ;

            if (type == SqlDbType.NVarChar || type == SqlDbType.VarChar || type == SqlDbType.NText || type == SqlDbType.Text)
            {
                parameterObject.Size = -1;
            }

            parameterObject.Direction = parameterDirection;

            if (value != null)
            {
                parameterObject.Value = value;
            }
            else
            {
                parameterObject.Value = DBNull.Value;
            }

            return parameterObject;
        }

        protected int ExecuteNonQuery(string procedureName, List<DbParameter> parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            int returnValue = -1;

            try
            {
                using (NpgsqlConnection connection = this.GetConnection())
                {
                    DbCommand cmd = this.GetCommand(connection, procedureName, commandType);

                    if (parameters != null && parameters.Count > 0)
                    {
                        cmd.Parameters.AddRange(parameters.ToArray());
                    }

                    returnValue = cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return returnValue;
        }

        protected object ExecuteScalar(string procedureName, List<NpgsqlParameter> parameters)
        {
            object returnValue = null;

            try
            {
                using (DbConnection connection = this.GetConnection())
                {
                    DbCommand cmd = this.GetCommand(connection, procedureName, CommandType.StoredProcedure);

                    if (parameters != null && parameters.Count > 0)
                    {
                        cmd.Parameters.AddRange(parameters.ToArray());
                    }

                    returnValue = cmd.ExecuteScalar();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return returnValue;
        }

        protected DbDataReader GetDataReader(string procedureName, List<DbParameter> parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            DbDataReader ds;

            try
            {
                using (DbConnection connection = this.GetConnection())
                {
                    DbCommand cmd = this.GetCommand(connection, procedureName, commandType);
                    if (parameters != null && parameters.Count > 0)
                    {
                        cmd.Parameters.AddRange(parameters.ToArray());
                    }

                    ds = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return ds;
        }

        protected DataSet ExecDataSet(string procedureName, List<DbParameter> parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                using (DbConnection connection = this.GetConnection())
                {
                    NpgsqlCommand command = new NpgsqlCommand(procedureName, connection as NpgsqlConnection);
                    command.CommandType = commandType;

                    if (parameters != null && parameters.Count > 0)
                    {
                        command.Parameters.AddRange(parameters.ToArray());
                    }

                    NpgsqlDataAdapter adapt = new NpgsqlDataAdapter(command);
                    DataSet ds = new DataSet();
                    adapt.Fill(ds);
                    return ds;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected int SaveCampaignUser_Dt(DataTable dt, int campaignId, int companyId, int createdBy, DateTime createdDate, string sp_name)
        {
            int returnValue = 0;
            try
            {
                //using (NpgsqlConnection connection = this.GetConnection())
                //{
                //    using (NpgsqlCommand cmd = connection.CreateCommand())
                //    {
                //        cmd.CommandText = sp_name;
                //        cmd.CommandType = CommandType.StoredProcedure;

                //        NpgsqlParameter dt_Param = cmd.Parameters.AddWithValue("@CampaignUserType", dt);
                //        dt_Param.SqlDbType = SqlDbType.Structured;
                //        dt_Param.TypeName = "dbo.CampaignUserType";
                //        cmd.Parameters.AddWithValue("@CampaignId", campaignId);
                //        cmd.Parameters.AddWithValue("@CompanyId", companyId);
                //        cmd.Parameters.AddWithValue("@CreatedBy", createdBy);
                //        cmd.Parameters.AddWithValue("@CreatedDate", createdDate);
                //        cmd.Parameters.AddWithValue("@IsActive", true);

                //        returnValue = cmd.ExecuteNonQuery();
                //    }
                //}
            }
            catch (Exception ex)
            {
                returnValue = -1;
                throw ex;
            }
            return returnValue;
        }

        protected int SaveEmailTemplate_Dt(DataTable dt, string campaignName, string companyName, int createdBy, DateTime createdDate, string sp_name)
        {
            int returnValue = 0;
            try
            {
                //using (NpgsqlConnection connection = this.GetConnection())
                //{
                //    using (NpgsqlCommand cmd = connection.CreateCommand())
                //    {
                //        cmd.CommandText = sp_name;
                //        cmd.CommandType = CommandType.StoredProcedure;

                //        NpgsqlParameter dt_Param = cmd.Parameters.AddWithValue("@EmailTemplateType", dt);
                //        dt_Param.SqlDbType = SqlDbType.Structured;
                //        dt_Param.TypeName = "dbo.EmailTemplateType";
                //        cmd.Parameters.AddWithValue("@CampaignName", campaignName);
                //        cmd.Parameters.AddWithValue("@CompanyName", companyName);
                //        cmd.Parameters.AddWithValue("@Transacted_By", createdBy);
                //        cmd.Parameters.AddWithValue("@Transacted_Date", createdDate);
                //        cmd.Parameters.AddWithValue("@IsActive", true);
                //        returnValue = cmd.ExecuteNonQuery();
                //    }
                //}
            }
            catch (Exception ex)
            {
                returnValue = -2;
                throw ex;
            }
            return returnValue;
        }
    }
}