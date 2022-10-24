CREATE DATABASE FilesDB
GO

USE FilesDB
GO

CREATE TABLE Files
(
	Id int primary key identity,
	FileUniqueName nvarchar(50) NOT NULL,
	FileActualName nvarchar(50) NOT NULL,
	FileExtension nvarchar(10) NOT NULL,
	ContentType nvarchar(50) NOT NULL,
	FilePath nvarchar(250) NOT NULL,
)
GO

-- To change column definition
ALTER TABLE Files ALTER COLUMN FileUniqueName nvarchar(100) NOT NULL

-- To rename columns
EXEC sp_RENAME 'Files.FileUniqueName' , 'UniqueName', 'COLUMN'
EXEC sp_RENAME 'Files.FileActualName' , 'ActualName', 'COLUMN'
EXEC sp_RENAME 'Files.FileExtension' , 'Extension', 'COLUMN'
EXEC sp_RENAME 'Files.FilePath' , 'Path', 'COLUMN'

-- To add columns
ALTER TABLE Files ADD DateAdded DATETIME;
ALTER TABLE Files ADD AltText nvarchar(250);
ALTER TABLE Files ADD Description nvarchar(250);