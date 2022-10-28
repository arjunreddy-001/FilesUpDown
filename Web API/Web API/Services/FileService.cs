using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Services
{
    public class FileService : IFileService
    {
        private static readonly string filesDirectory = "files";
        private string _appDirectory;

        private readonly FilesDBContext _context;

        public FileService(FilesDBContext context, IConfiguration configuration)
        {
            _context = context;
            _appDirectory = Path.Combine(configuration["StaticFiles"], filesDirectory);
        }

        public String GetFilePath(int id)
        {
            if (!Directory.Exists(_appDirectory))
                Directory.CreateDirectory(_appDirectory);

            var file = _context.Files.Where(fileRecord => fileRecord.Id == id).FirstOrDefault();

            var path = Path.Combine(_appDirectory, file.UniqueName + file.Extension);

            return path;
        }

        public Files GetFile(int id)
        {
            return _context.Files.FirstOrDefault(f => f.Id == id);
        }

        public List<Files> GetFiles()
        {
            return _context.Files.Select(file => new Files
            {
                Id = file.Id,
                UniqueName = file.UniqueName,
                ActualName = file.ActualName,
                Extension = file.Extension,
                ContentType = file.ContentType,
                Path = file.Path,
                DateAdded = file.DateAdded,
                AltText = file.AltText,
                Description = file.Description,
            }).ToList();
        }

        public async Task<bool> UploadFile(FileModel request)
        {
            Files file = await SaveFileAsync(request.file);

            // If file saved in physical path
            if (!string.IsNullOrEmpty(file.Path))
            {
                file.AltText = request.altText;
                file.Description = request.description;

                // Save file metadata in database
                SaveToDB(file);

                return true;
            }
            else
            {
                return false;
            }
        }

        private async Task<Files> SaveFileAsync(IFormFile myFile)
        {
            Files file = new Files();

            if (myFile != null)
            {
                if (!Directory.Exists(_appDirectory))
                    Directory.CreateDirectory(_appDirectory);

                file.UniqueName = Guid.NewGuid().ToString();
                file.ActualName = myFile.FileName;
                file.Extension = Path.GetExtension(myFile.FileName);
                file.ContentType = myFile.ContentType;
                file.DateAdded = DateTime.Now;

                var uniqueFileFullName = file.UniqueName + file.Extension;
                file.Path = filesDirectory + "/" + uniqueFileFullName;

                using (var stream = new FileStream(Path.Combine(_appDirectory, uniqueFileFullName), FileMode.Create))
                {
                    await myFile.CopyToAsync(stream);
                }

                return file;
            }
            return file;
        }

        private void SaveToDB(Files record)
        {
            if (record == null)
                throw new ArgumentNullException($"{nameof(record)}");

            _context.Files.Add(record);
            _context.SaveChanges();
        }

        public Files UpdateFileMeta(FileEditModel request)
        {
            Files file = GetFile(request.id);

            file.Description = request.description;
            file.AltText = request.altText;

            _context.Files.Update(file);
            _context.SaveChanges();

            return file;
        }
    }
}
