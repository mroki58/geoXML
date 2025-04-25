using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml;

namespace azureWebAPI.Services;

public interface IAddService
{
    ReturnMessage AddXMLToDb(string json); 
}

public class AddService : IAddService
{

    private readonly string _connectionString;
    public AddService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

 
    public ReturnMessage AddXMLToDb(string xml)
    {

        XmlDocument? xmlDocument = new XmlDocument();
        try
        {
            xmlDocument.LoadXml(xml);
        }
        catch (XmlException ex)
        {
            throw new InvalidOperationException("Invalid XML format.", ex);
        }

        string query = "INSERT INTO dbo.xmltable (Content) VALUES (@xml_value)";
        SqlCommand cmd = new SqlCommand(query);
        cmd.Parameters.AddWithValue("@xml_value", xmlDocument.OuterXml);
        int rowsAffected = 0;

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            cmd.Connection = connection;
            rowsAffected = cmd.ExecuteNonQuery();
        }

        if (rowsAffected > 0)
        {
            return new ReturnMessage { message = "XML data inserted successfully." };
        }
        
        return new ReturnMessage { message = "Failed to insert XML data." };
        
    }
}

// using (var reader = command.ExecuteReader())
// {
//     while (reader.Read())
//     {
//         items.Add(new TestItem
//         {
//             Id = reader.GetInt32(0),
//             Value = reader.GetString(1)
//         });
//     }
// }