using azureWebAPI.Models;
using azureWebAPI.Database;
using Microsoft.Data.SqlClient;

namespace azureWebAPI.Services;

public interface ITestItemService
{
    IEnumerable<TestItem> GetTestItems();
}

public class TestItemService : ITestItemService
{

    private readonly string _connectionString;
    public TestItemService(AzureDbContext dbContext)
    {
        _connectionString = dbContext.GetConnectionString();
    }

 
    public IEnumerable<TestItem> GetTestItems()
    {
        var items = new List<TestItem>();

        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var command = new SqlCommand("SELECT id, string_value FROM dbo.test", connection);
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    items.Add(new TestItem
                    {
                        Id = reader.GetInt32(0),
                        Value = reader.GetString(1)
                    });
                }
            }
        }

        return items;
    }
}
