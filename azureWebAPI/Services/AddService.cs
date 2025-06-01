using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml;

namespace azureWebAPI.Services;

public interface IAddService
{
    MyXML CreateXML(CreateXmlRequest req);
    ReturnMessage AddXMLToDb(string xml); 
}

public class AddService : IAddService
{

    private readonly string _connectionString;
    public AddService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

    public MyXML CreateXML(CreateXmlRequest req)
    {
        MyXML result = new MyXML();

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand(
                @"SELECT dbo.createXMLForData(
                    @name, @type, @estimatedVolume, @depth, @status, 
                    @location, @region, @latitude, @longitude, @radius
                )", connection);

            command.Parameters.AddWithValue("@name", req.name ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@type", req.type ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@estimatedVolume", req.estimatedVolume);
            command.Parameters.AddWithValue("@depth", req.depth);
            command.Parameters.AddWithValue("@status", req.status ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@location", req.location ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@region", req.region ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@latitude", req.latitude);
            command.Parameters.AddWithValue("@longitude", req.longitude);
            command.Parameters.AddWithValue("@radius", req.radius);

            connection.Open();
            var xmlResult = command.ExecuteScalar();
            result.xml = xmlResult?.ToString();
        }

        return result;
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