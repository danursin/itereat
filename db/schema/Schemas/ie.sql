IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'ie')
BEGIN
    EXEC sys.sp_executesql N'CREATE SCHEMA [ie]'
END
GO
