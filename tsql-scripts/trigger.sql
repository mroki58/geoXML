CREATE TRIGGER trg_PreventDuplicateDepositName
ON dbo.xmltable
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Sprawdzenie, czy którakolwiek z prób wstawienia ma już istniejący name
    IF EXISTS (
        SELECT 1
        FROM INSERTED i
        CROSS APPLY (
            SELECT i.Content.value('(/deposit/@name)[1]', 'nvarchar(255)') AS NewName
        ) AS newxml
        WHERE EXISTS (
            SELECT 1
            FROM xmltable x
            WHERE x.Content.value('(/deposit/@name)[1]', 'nvarchar(255)') = newxml.NewName
        )
    )
    BEGIN
        RAISERROR('Obiekt o tej samej nazwie już istnieje.', 16, 1);
        RETURN;
    END;

    INSERT INTO xmltable (Content)
    SELECT Content
    FROM INSERTED;
END;

