IF OBJECT_ID('dbo.createXMLForData') IS NOT NULL
    DROP FUNCTION dbo.createXMLForData;
GO
CREATE FUNCTION dbo.createXMLForData(
    @name NVARCHAR(MAX),
    @type NVARCHAR(MAX),
    @estimatedVolume FLOAT,
    @depth FLOAT,
    @status NVARCHAR(MAX),
    @location NVARCHAR(MAX),
    @region NVARCHAR(MAX),
    @latitude FLOAT,
    @longitude FLOAT,
    @radius FLOAT
)
RETURNS XML
AS
BEGIN
    RETURN (
        SELECT 
            @name AS "@name",
            (
                SELECT 
                    @type AS "type",
                    FORMAT(@estimatedVolume, '0.0', 'en-US') AS "estimatedVolume",
                    FORMAT(@depth, '0.0', 'en-US') AS "depth",
                    @status AS "status"
                FOR XML PATH('geology'), TYPE
            ),
            (
                SELECT 
                    @location AS "location",
                    @region AS "region",
                    FORMAT(@latitude, '0.000000', 'en-US') AS "latitude",
                    FORMAT(@longitude, '0.000000', 'en-US') AS "longitude",
                    FORMAT(@radius, '0.0', 'en-US') AS "radius"
                FOR XML PATH('geography'), TYPE
            )
        FOR XML PATH('deposit'), TYPE
    );
END
GO
SELECT dbo.createXMLForData(
    N'Złoże A',          -- @name
    N'Wapień',           -- @type
    12000.5,             -- @estimatedVolume
    80.3,                -- @depth
    N'eksploatowane',    -- @status
    N'Kraków',           -- @location
    N'Małopolskie',      -- @region
    50.061,              -- @latitude
    19.938,              -- @longitude
    2.5                  -- @radius
) AS DepositXML;
GO
GRANT EXECUTE ON dbo.createXMLForData TO [aplikacja_user];


