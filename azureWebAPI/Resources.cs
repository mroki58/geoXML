using DbLibrary;

namespace azureWebAPI;

public class AppResources
{
    public readonly DbConnectionManager Db; // lub z connection stringiem
    public readonly XmlRepo repo;
    

    public AppResources()
    {
        Db = new DbConnectionManager();
        repo = new XmlRepo(Db);

    }
}