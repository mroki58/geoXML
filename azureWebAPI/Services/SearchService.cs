using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml.XPath;

namespace azureWebAPI.Services;

public interface ISearchService
{
    XmlData GetXmlValues(string path); 
}

public class SearchService : ISearchService
{

    private readonly string _connectionString;
    public SearchService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

 
    public XmlData GetXmlValues(string path)
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

        string query = "SELECT id, C.query('.') as result " + 
                        "FROM dbo.xmltable  " +
                        $"CROSS APPLY Content.nodes('{path}') as T(C) ";
        
        SqlCommand cmd = new SqlCommand(query);
        SqlDataReader? reader;

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            cmd.Connection = connection;
            reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                SortedDictionary<int, List<string>> data = new SortedDictionary<int, List<string>>();
                while (reader.Read())
                {
                    int idValue = reader.GetInt32(0);
                    string? value = reader.GetString(1);
                    if (value != null)
                    {
                        if (data.ContainsKey(idValue))
                        {
                            data[idValue].Add(value);
                        }
                        else
                        {
                            data.Add(idValue, new List<string>() {value} );
                        }                   
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