using DotNetEnv;
using Microsoft.Data.SqlClient;

namespace azureWebAPI.Database;


public class AzureDbContext 
{
    public readonly string? ConnectionString;
    public AzureDbContext()
    {
        Env.Load();
        ConnectionString = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTION");
        if (string.IsNullOrEmpty(ConnectionString))
        {
            throw new Exception("Connection string is not set.");
        }
    }

    public string GetConnectionString()
    {
        if (string.IsNullOrEmpty(ConnectionString))
        {
            throw new Exception("Connection string is not set.");
        }
        
        return ConnectionString;
    }
}