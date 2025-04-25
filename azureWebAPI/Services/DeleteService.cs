using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml;

namespace azureWebAPI.Services;

public interface IDeleteService
{
    ReturnMessage DeleteXmlForNode(string nodeName, string nodeValue);
}
public class DeleteService : IDeleteService
{
    private readonly string _connectionString;
    public DeleteService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

    public ReturnMessage DeleteXmlForNode(string nodeName, string nodeValue)
    {
 
        string query = "DELETE FROM dbo.xmltable " +
               "WHERE Content.exist('//*[local-name()=sql:variable(\"@nodeName\") and text()=sql:variable(\"@nodeValue\")]') = 1";
        
        SqlCommand cmd = new(query);
        cmd.Parameters.AddWithValue("@nodeName", nodeName);
        cmd.Parameters.AddWithValue("@nodeValue", nodeValue);

        int rowsAffected = 0;

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            cmd.Connection = connection;
            rowsAffected = cmd.ExecuteNonQuery();
        }

        if (rowsAffected > 0)
        {
            return new ReturnMessage { message = "XML data deleted successfully." };
        }
        
        return new ReturnMessage { message = "Data wasn't removed" };
    }
}