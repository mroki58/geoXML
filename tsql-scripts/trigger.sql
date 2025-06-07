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
GO
CREATE TRIGGER trg_PreventDuplicateDepositNameOnUpdate
ON dbo.xmltable
INSTEAD OF UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM INSERTED i
        JOIN DELETED d ON i.id = d.id
        CROSS APPLY (
            SELECT 
                i.Content.value('(/deposit/@name)[1]', 'nvarchar(255)') AS NewName,
                d.Content.value('(/deposit/@name)[1]', 'nvarchar(255)') AS OldName
        ) AS names
        WHERE names.NewName <> names.OldName
          AND EXISTS (
              SELECT 1
              FROM dbo.xmltable x
              WHERE x.Content.value('(/deposit/@name)[1]', 'nvarchar(255)') = names.NewName
                AND x.id <> i.id
          )
    )
    BEGIN
        RAISERROR('Nie można zmienić nazwy na już istniejącą.', 16, 1);
        RETURN;
    END;

    -- Wykonujemy aktualizację
    UPDATE x
    SET x.Content = i.Content
    FROM dbo.xmltable x
    JOIN INSERTED i ON x.id = i.id;
END;
GO
