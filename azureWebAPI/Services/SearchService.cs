using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml.XPath;

namespace azureWebAPI.Services;

public interface ISearchService
{
    XmlData GetXmlNode(string path, int id); 
}

public class SearchService : ISearchService
{

    private readonly string _connectionString;
    public SearchService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

 
    public XmlData GetXmlNode(string path, int id)
    {
        try
        {
            XPathExpression.Compile(path); // Sprawdzenie poprawności XPath
        }
        catch (XPathException)
        {
            throw new ArgumentException("Invalid XPath.");
        }


        XmlData? stringData = new XmlData();

        string query = "SELECT C.query('.') as result " + 
                        "FROM dbo.xmltable  " +
                        $"CROSS APPLY Content.nodes('{path}') as T(C) "  +
                        "WHERE id= @id ";
        SqlCommand cmd = new SqlCommand(query);
        cmd.Parameters.AddWithValue("@path", path);
        cmd.Parameters.AddWithValue("@id", id);

        SqlDataReader? reader;

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            cmd.Connection = connection;
            reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                List<string> data = new List<string>();
                while (reader.Read())
                {
                    string? value = reader.GetString(0);
                    if (value != null)
                    {
                        data.Add(value);
                    }
                }
                stringData.data = data;
                stringData.message = "Data retrieved successfully.";
            }
            else
            {
                stringData.message = "No data found.";
            }


        }
        
        return stringData;
        
    }
    
}