using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;
using System.Xml.XPath;
using System.Text.RegularExpressions;

namespace azureWebAPI.Services;

public interface IModifyService
{
    ReturnMessage ModifyNodeValue(string path, string value, int id); 
    ReturnMessage ModifyAttrValue(string path, string attr, string value, int id);
}

public class ModifyService : IModifyService
{

    private readonly string _connectionString;
    public ModifyService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

    public ReturnMessage ModifyNodeValue(string path, string value, int id)
    {
        if(!Regex.IsMatch(value, @"^[a-zA-Z0-9]+$"))
        {
            throw new ArgumentException("Invalid Value");
        }

        try
        {
            XPathExpression.Compile(path); // Sprawdzenie poprawności XPath
        }
        catch (XPathException)
        {
            throw new ArgumentException("Invalid XPath.");
        }
   
        string query = "UPDATE dbo.xmltable " +
                       $"SET Content.modify('replace value of ({path}/text())[1] with \"{value}\"') " +
                       "WHERE id= @id ";

        return Modify(query, id);
        
    }   

    public ReturnMessage ModifyAttrValue(string path, string attr ,string value, int id)
    {
        if (!Regex.IsMatch(value, @"^[a-zA-Z0-9]+$"))
        {
            throw new ArgumentException("Invalid Value");
        }

        if (!Regex.IsMatch(attr, @"^[a-zA-Z0-9]+$"))
        {
            throw new ArgumentException("Invalid Value");
        }

        try
        {
            XPathExpression.Compile(path); // Sprawdzenie poprawności XPath
        }
        catch (XPathException)
        {
            throw new ArgumentException("Invalid XPath.");
        }

        string query = "UPDATE dbo.xmltable " +
                       $"SET Content.modify('replace value of ({path}/@{attr})[1] with \"{value}\"') " +
                       "WHERE id = @id ";
        return Modify(query, id);
        
    }

    private ReturnMessage Modify(string query, int id)
    {
        ReturnMessage? msg = new ReturnMessage();
        SqlCommand cmd = new SqlCommand(query);
        cmd.Parameters.AddWithValue("@id", id);

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            cmd.Connection = connection;
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                msg.message = "XML modified successfully.";
            }
            else
            {
                msg.message = "XML element not found.";
            }
        }
        return msg;
    }

}